import {
  createContext,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSmartForm } from "../../../components/form/SmartForm/hooks/useSmartForm";
import { PostFields, postFields } from "../constants/postFields";
import {
  FormFields,
  FormValue,
} from "../../../components/form/SmartForm/types";
import { FormErrors } from "../../../models/IValidationReturn";
import { FieldConfig } from "../../../components/form/SmartField/types";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import { PostPayload, postService } from "../../../services/postService";
import { useToast } from "../../../hooks/useToast";
import { TOAST_MESSAGES } from "../../../constants/toastMessages";
import { AxiosError } from "axios";
import { IApiErrorResponse } from "../../../models/IApiErrorResponse";
import { useResource } from "../../../hooks/useResource";
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage";

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
  const { launchToast } = useToast();
  const { postsResource, popularTagsResource, popularCategoriesResource } =
    useResource();
  const storedPostDraft = localStorage.getItem("postDraft");
  const draft = storedPostDraft ? JSON.parse(storedPostDraft) : undefined;
  const navigate = useNavigate();

  const [draftSavedAt, setDraftSavedAt] = useState(new Date());
  const handleCreatePost = async (data: PostFields) => {
    const payload: PostPayload = {
      title: data.title,
      content: data.content,
      categoryId: Number(data.categoryId),
      tags: data.tags.split(" "),
    };
    return postService
      .create(payload)
      .then(() => {
        launchToast({
          title: TOAST_MESSAGES.Post.createdTitle,
          description: TOAST_MESSAGES.Post.createdDescription,
        });
        postsResource.revalidate();
        popularTagsResource.revalidate();
        popularTagsResource.fetchData();
        popularCategoriesResource.revalidate();
        popularCategoriesResource.fetchData();
        localStorage.removeItem("postDraft");
        navigate("/");
      })
      .catch((error: AxiosError<IApiErrorResponse>) => {
        launchToast({
          title: TOAST_MESSAGES.Post.createErrorTitle,
          description:
            getApiErrorMessage(error) ||
            TOAST_MESSAGES.Post.createErrorDescription,
        });
      });
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

  // eslint-disable-next-line
  const handleChangeContent = useCallback(
    debounce((text: string) => {
      handleChangeValue(text, "content");
    }, 1000),
    [],
  );

  const visibleFields = useMemo(
    () => serializedFields.filter((field) => field.id !== "content"),
    // eslint-disable-next-line
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
