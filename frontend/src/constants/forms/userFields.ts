import { FieldConfig } from "../../components/form/SmartField/types";

export const userFields = {
  fullName: {
    id: "fullName",
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
    validations: [
      {
        rule: (value) => value.trim().length >= 3,
        message: "Name must be at least 3 characters long",
      },
      {
        rule: (value) => value.split(" ").length > 1,
        message: "Enter your last name",
      },
    ],
  } as FieldConfig,
  username: {
    id: "username",
    label: "Username",
    type: "text",
    placeholder: "Enter your username",
    validations: [
      {
        rule: (value) => value.trim() !== "",
        message: "Username is required",
      },
      {
        rule: (value) => value.trim().length >= 3,
        message: "Username must be at least 3 characters long",
      },
      {
        rule: (value) => value.trim().length <= 50,
        message: "Username must be at most 50 characters long",
      },
    ],
  } as FieldConfig,
  email: {
    id: "email",
    label: "Email",
    type: "text",
    placeholder: "Enter your email",
    validations: [
      {
        rule: (value) => value.trim() !== "",
        message: "Email is required",
      },
      {
        rule: (value) => /\S+@\S+\.\S+/.test(value),
        message: "Invalid email address",
      },
    ],
  } as FieldConfig,
  password: {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    validations: [
      {
        rule: (value) => value.trim() !== "",
        message: "Password is required",
      },
      {
        rule: (value) => value.length >= 6,
        message: "Password must be at least 6 characters long",
      },
    ],
  } as FieldConfig,
  confirmPassword: {
    id: "confirmPassword",
    label: "Confirm password",
    type: "password",
    placeholder: "Enter your password",
    validations: [
      {
        rule: (value) => value.trim() !== "",
        message: "Password confirmation is required",
      },
      {
        rule: (value, form) => value === form.password,
        message: "Passwords do not match",
      },
    ],
  } as FieldConfig,
  avatar: {
    label: "Profile Picture",
    type: "file",
    id: "avatar",
    placeholder: "Drag & drop or select your profile picture",
    allowedFileTypes: ["image/*"],
    height: 200,
    width: 200,
  } as FieldConfig,
};
