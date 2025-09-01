import { IFields } from "@/Type/IFields";

export const fieldConfig: IFields[] = [
  {
    label: "Title",
    valueKey: "title",
    placeholder: "Enter the title",
    type: "text",
    formType: "string",
    required: true,
  },
  {
    label: "Logo",
    valueKey: "logo",
    placeholder: "Upload a logo",
    type: "image",
    formType: "file",
    multiple: false,
    maxFiles: 1,
    minFiles: 1, // ✅ Minimum 1 image required
    required: true,
  },
  {
    label: "Link",
    valueKey: "link",
    placeholder: "Enter the link",
    type: "text",
    formType: "string",
    required: true,
  },
];
