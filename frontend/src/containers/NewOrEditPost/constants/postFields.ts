import { FieldConfig } from "../../../components/form/SmartField/types";

export const postFields: FieldConfig[] = [
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
    id: "tags",
    type: "text",
    label: "Add tags",
    placeholder: "Write your tags here. #math #something",
    required: false,
  },
  {
    id: "content",
    type: "text",
    label: "Content",
    placeholder: "Enter the content",
    required: true,
  },
];
