import { useEditPost } from "../hooks/useEditPost";
import { PostFormCard } from "./PostFormCard";

export function EditPostDetailsCard() {
  const {
    data,
    errors,
    disabled,
    loading,
    visibleFields,
    handleSubmit,
    handleChangeValue,
  } = useEditPost();
  return (
    <PostFormCard
      data={data}
      disabled={disabled}
      errors={errors}
      fields={visibleFields}
      handleChangeValue={handleChangeValue}
      handleSubmit={handleSubmit}
      loading={loading}
    />
  );
}
