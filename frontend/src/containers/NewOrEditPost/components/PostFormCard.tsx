import { FormEvent, memo, useMemo } from "react";
import { useResource } from "../../../hooks/useResource";
import { ISelectOption } from "../../../models/ISelectOption";
import { Card } from "../../../components/ui/Card";
import { Heading } from "../../../components/ui/Heading";
import { Text } from "../../../components/ui/Text";
import { FieldConfig } from "../../../components/form/SmartField/types";
import { SmartField } from "../../../components/form/SmartField";
import { Loading } from "../../../components/ui/Loading";
import { MdOutlineSend } from "react-icons/md";
import { format } from "date-fns";
import {
  FormFields,
  FormValue,
} from "../../../components/form/SmartForm/types";
import { FormErrors } from "../../../models/IValidationReturn";
import { Button } from "../../../components/ui/Button";
const MemoizedSmartField = memo(SmartField);

interface PostFormCardProps {
  data: FormFields;
  disabled: boolean;
  draftSavedAt?: Date;
  errors: FormErrors;
  fields: FieldConfig[];
  handleChangeValue: (value: FormValue, id: string) => void;
  handleSubmit: (e?: FormEvent) => void;
  loading: boolean;
}
export function PostFormCard({
  data,
  disabled,
  draftSavedAt,
  errors,
  fields,
  handleChangeValue,
  handleSubmit,
  loading,
}: PostFormCardProps) {
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
        {fields.map((field) => (
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
        {draftSavedAt && (
          <Text>Draft saved at {format(draftSavedAt, "hh:mm aaaaa'm'")}</Text>
        )}
      </form>
    </Card>
  );
}
