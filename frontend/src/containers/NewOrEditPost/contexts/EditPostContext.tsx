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
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { Alert } from "../../../components/ui/Alert";
import { Post } from "../../../models/Post";
import { postService } from "../../../services/postService";
import { ContentSkeleton } from "../../../components/shared/skeletons/ContentSkeleton";
import { useToast } from "../../../hooks/useToast";
import { AxiosError } from "axios";
import { TOAST_MESSAGES } from "../../../constants/toastMessages";
import { PostNotFound } from "../../../components/shared/fallbacks/PostNotFound";

interface EditPostProviderProps {
  children: React.ReactNode;
}

export interface EditPostContextType {
  data: FormFields;
  handleChangeValue: (value: FormValue, id: string) => void;
  disabled: boolean;
  errors: FormErrors;
  handleSubmit: (e?: FormEvent) => void;
  loading: boolean;
  visibleFields: FieldConfig[];
  handleChangeContent: (value: string) => void;
  initialContent: string;
}

export const EditPostContext = createContext<EditPostContextType>(
  {} as EditPostContextType,
);

export const EditPostProvider = ({ children }: EditPostProviderProps) => {
  const { user } = useAuth();
  const { id } = useParams();
  const { launchToast } = useToast();
  const [loadingPost, setLoadingPost] = useState(true);
  const [post, setPost] = useState<Post | null>(null);

  const navigate = useNavigate();

  const handleSavePost = async (data: FormFields) => {
    console.log(data);
    navigate("/");
  };

  const {
    data,
    setData,
    handleChangeValue,
    disabled,
    errors,
    serializedFields,
    handleSubmit,
    loading,
  } = useSmartForm({
    fields: postFields,
    onSubmit: handleSavePost,
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

  const initialContent = post?.content || "";

  useEffect(() => {
    if (!id) return;
    setLoadingPost(true);
    postService
      .getById(id)
      .then((res) => {
        setPost(res.data);
        setData({
          content: res.data.content,
          categoryId: String(res.data.category.id),
          tags: res.data.tags?.map((tag) => tag.name).join(" ") ?? "",
          title: res.data.title,
        });
      })
      .catch((error: AxiosError) => {
        if (error.status !== 404) {
          launchToast({
            color: "danger",
            title: TOAST_MESSAGES.common.unexpectedErrorTitle,
            description: TOAST_MESSAGES.common.unexpectedErrorDescription,
          });
        }
      })
      .finally(() => setLoadingPost(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
    ],
  );

  if (loadingPost) return <ContentSkeleton />;
  if (!post) return <PostNotFound />;

  if (post && post.user.id !== user?.id)
    return (
      <div className="p-8">
        <Alert color="warning">
          You're not the owner of this post.{" "}
          <Link to={`/post/${id}`} className="underline">
            Go back to the post.
          </Link>
        </Alert>
      </div>
    );

  return (
    <EditPostContext.Provider value={values}>
      {children}
    </EditPostContext.Provider>
  );
};
