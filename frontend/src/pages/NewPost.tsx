import { TextEditor } from "../components/form/TextEditor";
import { Content } from "../components/layout/Content";
import { NavigationCard } from "../components/shared/NavigationCard";
import { PopularItemCard } from "../components/shared/PopularItemCard";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { MdOutlineSend } from "react-icons/md";
import { SmartField } from "../components/form/SmartField";
import { FieldConfig } from "../components/form/SmartField/types";
import { useSmartForm } from "../components/form/SmartForm/hooks/useSmartForm";

const postFields: FieldConfig[] = [
  {
    id: "content",
    type: "text",
    label: "Content",
    placeholder: "Enter the content",
    required: true,
  },
  {
    id: "title",
    type: "text",
    label: "Add a title",
    placeholder: "Your creative title",
    required: true,
  },
  {
    id: "categoryId",
    type: "select",
    label: "Add a category",
    placeholder: "Select the category",
    required: true,
    options: [
      { value: "2", label: "Issue" },
      { value: "3", label: "Discussion" },
      { value: "4", label: "Feedback" },
      { value: "5", label: "Debate" },
      { value: "6", label: "Tutorials" },
    ],
  },
  {
    id: "tagIds",
    type: "text",
    label: "Add tags",
    placeholder: "Write your tags here. #math #something",
    required: false,
  },
];

export function NewPost() {
  const formState = useSmartForm({
    fields: postFields,
    onSubmit: async () => {},
  });
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
        <TextEditor
          markdown={`# Your title\nYour content`}
          className="min-h-[400px] max-sm:max-h-[760px] sm:max-h-[560px] 3xl:max-h-[700px]"
          onChange={(text: string) => {
            formState.handleChangeValue(text, "content");
          }}
        />
      </Content.Main>
      <Content.Sidebar>
        <Card>
          <form className="space-y-6">
            {postFields.map((field) => (
              <SmartField
                key={field.id}
                config={field}
                value={formState.data[field.id]}
                onChangeValue={formState.handleChangeValue}
              />
            ))}
            <Button className="w-full">
              <MdOutlineSend className="size-6 mr-2" /> Publish
            </Button>
            <Button className="w-full" color="secondary">
              Save as draft
            </Button>
          </form>
        </Card>
      </Content.Sidebar>
    </Content.Root>
  );
}
