import { memo } from "react";
import { SmartField } from "../../../components/form/SmartField";
import { Card } from "../../../components/ui/Card";
import { Heading } from "../../../components/ui/Heading";
import { Text } from "../../../components/ui/Text";
import { useNewPost } from "../hooks/useNewPost";
import { Button } from "../../../components/ui/Button";
import { MdOutlineSend } from "react-icons/md";
import { format } from "date-fns";
import { Loading } from "../../../components/ui/Loading";
const MemoizedSmartField = memo(SmartField);

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
    <Card className="flex flex-col">
      <Heading size="xs">Post details</Heading>
      <Text asChild>
        <span className="mt-2">
          This information helps others understand the context of your content.
        </span>
      </Text>
      <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
        {visibleFields.map((field) => (
          <MemoizedSmartField
            key={field.id}
            config={field}
            value={data[field.id]}
            onChangeValue={handleChangeValue}
            disabled={disabled}
            error={errors[field.id]}
          />
        ))}
        <Button className="w-full" type="submit" disabled={disabled}>
          {loading && <Loading className="mr-2" size="sm" />}
          <MdOutlineSend className="size-6 mr-2" /> Publish post
        </Button>
        <Text>Draft saved at {format(draftSavedAt, "hh:mm")}</Text>
      </form>
    </Card>
  );
}
