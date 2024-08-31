import { TextEditor } from "../components/form/TextEditor";
import { Content } from "../components/layout/Content";
import { NavigationCard } from "../components/shared/NavigationCard";
import { PopularItemCard } from "../components/shared/PopularItemCard";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { MdOutlineSend } from "react-icons/md";
import { SmartField } from "../components/form/SmartField";
import { useSmartForm } from "../components/form/SmartForm/hooks/useSmartForm";
import { Heading } from "../components/ui/Heading";
import { Text } from "../components/ui/Text";
import { memo, useCallback, useMemo } from "react";
import { FieldError } from "../components/form/FieldError";
import { postFields } from "../containers/NewOrEditPost/constants/postFields";
import { GoBack } from "../components/ui/GoBack";
const MemoizedSmartField = memo(SmartField);

export function NewPost() {
  const {
    data,
    handleChangeValue,
    disabled,
    errors,
    serializedFields,
    handleSubmit,
  } = useSmartForm({
    fields: postFields,
    onSubmit: async (data) => {
      console.log(data);
    },
  });
  const handleChangeContent = useCallback((text: string) => {
    handleChangeValue(text, "content");
  }, []);
  const visibleFields = useMemo(
    () => serializedFields.filter((field) => field.id !== "content"),
    [],
  );
  return (
    <Content.Root>
      <Content.Sidebar>
        <NavigationCard />
        <PopularItemCard
          title="Popular tags"
          path="/tags"
          items={[
            { id: 1, label: "#biology", totalPosts: 53 },
            { id: 7, label: "#math", totalPosts: 43 },
            { id: 8, label: "#science", totalPosts: 41 },
            { id: 9, label: "#englsih", totalPosts: 31 },
            { id: 10, label: "#history", totalPosts: 12 },
          ]}
        />
        <PopularItemCard
          title="Popular categories"
          path="/categories"
          items={[
            { id: 2, label: "Issue", totalPosts: 286 },
            { id: 3, label: "Discussion", totalPosts: 233 },
            { id: 4, label: "Feedback", totalPosts: 211 },
            { id: 5, label: "Debate", totalPosts: 173 },
            { id: 6, label: "Tutorials", totalPosts: 163 },
          ]}
        />
      </Content.Sidebar>
      <Content.Main>
        <div className="flex flex-col space-y-6 h-[calc(var(--content-height)-var(--main-content-padding-x)-var(--main-content-padding-x))]">
          <div className="flex items-center">
            <GoBack to="/" hideText />
            <Heading size="lg" asChild>
              <h2 className="text-amber-100 ml-3">New post</h2>
            </Heading>
          </div>
          <TextEditor
            markdown={``}
            placeholder="Ask a question, share your thoughts, bring interesting discussions..."
            className="flex flex-col flex-1"
            onChange={handleChangeContent}
          />
          <FieldError message={errors["content"]} />
        </div>
      </Content.Main>
      <Content.Sidebar>
        <Card className="flex flex-col">
          <Heading size="xs">Post details</Heading>
          <Text asChild>
            <span className="mt-2">
              This information helps others understand the context of your
              content.
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
            <Button className="w-full" type="submit">
              <MdOutlineSend className="size-6 mr-2" /> Publish post
            </Button>
            <Text>Draft saved at 12:55 am</Text>
          </form>
        </Card>
      </Content.Sidebar>
    </Content.Root>
  );
}
