import { memo, useMemo } from "react";
import { SmartField } from "../../../components/form/SmartField";
import { Card } from "../../../components/ui/Card";
import { Heading } from "../../../components/ui/Heading";
import { Text } from "../../../components/ui/Text";
import { useNewPost } from "../hooks/useNewPost";
import { Button } from "../../../components/ui/Button";
import { MdOutlineSend } from "react-icons/md";
import { format } from "date-fns";
import { Loading } from "../../../components/ui/Loading";
import { useResource } from "../../../hooks/useResource";
import { ISelectOption } from "../../../models/ISelectOption";
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
  const { categoriesResource } = useResource();
  const options: { [key: string]: ISelectOption[] } = useMemo(
    () => ({
      categoryId: categoriesResource.data.map((c) => ({
        label: c.name,
        value: String(c.id),
      })),
    }),
    [categoriesResource.data],
  );
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
            options={options[field.id]}
          />
        ))}
        <Button className="w-full" type="submit" disabled={disabled}>
          {loading && <Loading className="mr-2" size="sm" />}
          <MdOutlineSend className="size-6 mr-2" /> Publish post
        </Button>
        <Text>Draft saved at {format(draftSavedAt, "hh:mm aaaaa'm'")}</Text>
      </form>
    </Card>
  );
}
