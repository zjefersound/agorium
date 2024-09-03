import { FieldConfig } from "../../../components/form/SmartField/types";

export type PostFields = {
  title: string;
  categoryId: string;
  content: string;
  tags: string;
};
export const postFields: FieldConfig[] = [
  {
    id: "title",
    type: "text",
    label: "Add a title",
    placeholder: "Your creative title",
    required: true,
    validations: [
      {
        rule: (value) => value.trim() !== "",
        message: "Title is required",
      },
      {
        rule: (value) => value.length <= 100,
        message: "Title must be 100 characters or less",
      },
    ],
  },
  {
    id: "categoryId",
    type: "select",
    label: "Add a category",
    placeholder: "Select the category",
    required: true,
    fetchOptionsFromApi: true,
    validations: [
      {
        rule: (value) => value.trim() !== "",
        message: "Category is required",
      },
    ],
  },
  {
    id: "tags",
    type: "text",
    label: "Add tags",
    placeholder: "Write your tags here. #math #something",
    required: false,
    validations: [
      {
        rule: (value) =>
          value.split(" ").every((tag: string) => tag.startsWith("#")),
        message: "Each tag must start with #",
      },
      {
        rule: (value) =>
          value.split(" ").every((tag: string) => tag.length <= 30),
        message: "Each tag must be 30 characters or less",
      },
    ],
  },
  {
    id: "content",
    type: "text",
    label: "Content",
    placeholder: "Enter the content",
    required: true,
    validations: [
      {
        rule: (value) => value.trim() !== "",
        message: "Content is required",
      },
      {
        rule: (value) => value.length >= 50,
        message: "Content must be at least 50 characters long",
      },
    ],
  },
];
