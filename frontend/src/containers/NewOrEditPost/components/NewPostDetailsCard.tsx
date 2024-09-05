import { useNewPost } from "../hooks/useNewPost";
import { PostFormCard } from "./PostFormCard";

export function NewPostDetailsCard() {
  const {
    data,
    errors,
    disabled,
    loading,
    visibleFields,
    handleSubmit,
    handleChangeValue,
    draftSavedAt,
  } = useNewPost();
  return (
    <PostFormCard
      data={data}
      disabled={disabled}
      draftSavedAt={draftSavedAt}
      errors={errors}
      fields={visibleFields}
      handleChangeValue={handleChangeValue}
      handleSubmit={handleSubmit}
      loading={loading}
    />
  );
}
