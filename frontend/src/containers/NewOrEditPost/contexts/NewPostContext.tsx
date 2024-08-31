import {
  createContext,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSmartForm } from "../../../components/form/SmartForm/hooks/useSmartForm";
import { postFields } from "../constants/postFields";
import {
  FormFields,
  FormValue,
} from "../../../components/form/SmartForm/types";
import { FormErrors } from "../../../models/IValidationReturn";
import { FieldConfig } from "../../../components/form/SmartField/types";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";

interface NewPostProviderProps {
  children: React.ReactNode;
}

export interface NewPostContextType {
  data: FormFields;
  handleChangeValue: (value: FormValue, id: string) => void;
  disabled: boolean;
  errors: FormErrors;
  handleSubmit: (e?: FormEvent) => void;
  loading: boolean;
  visibleFields: FieldConfig[];
  handleChangeContent: (value: string) => void;
  initialContent: string;
  draftSavedAt: Date;
}

export const NewPostContext = createContext<NewPostContextType>(
  {} as NewPostContextType,
);

export const NewPostProvider = ({ children }: NewPostProviderProps) => {
  const storedPostDraft = localStorage.getItem("postDraft");
  const draft = storedPostDraft ? JSON.parse(storedPostDraft) : undefined;
  const navigate = useNavigate();

  const [draftSavedAt, setDraftSavedAt] = useState(new Date());
  const handleCreatePost = async (data: FormFields) => {
    console.log(data);
    localStorage.removeItem("postDraft");
    navigate("/");
  };

  const {
    data,
    handleChangeValue,
    disabled,
    errors,
    serializedFields,
    handleSubmit,
    loading,
  } = useSmartForm({
    dataValue: draft,
    fields: postFields,
    onSubmit: handleCreatePost,
  });

  const handleChangeContent = useCallback(
    debounce((text: string) => {
      if (text) {
        handleChangeValue(text, "content");
      }
    }, 1000),
    [],
  );

  const visibleFields = useMemo(
    () => serializedFields.filter((field) => field.id !== "content"),
    [],
  );

  const initialContent = draft?.content || "";

  useEffect(() => {
    localStorage.setItem("postDraft", JSON.stringify(data));
    setDraftSavedAt(new Date());
  }, [data]);

  const values = useMemo(
    () => ({
      data,
      handleChangeValue,
      disabled,
      errors,
      handleSubmit,
      loading,
      visibleFields,
      handleChangeContent,
      initialContent,
      draftSavedAt,
    }),
    [
      data,
      disabled,
      errors,
      handleSubmit,
      loading,
      visibleFields,
      initialContent,
      draftSavedAt,
    ],
  );

  return (
    <NewPostContext.Provider value={values}>{children}</NewPostContext.Provider>
  );
};
