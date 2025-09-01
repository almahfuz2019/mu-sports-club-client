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
    label: "Designation",
    valueKey: "designation",
    placeholder: "Enter the designation",
    type: "text",
    formType: "string",
    required: true,
  },
  {
    label: "Image",
    valueKey: "image",
    placeholder: "Upload a image",
    type: "image",
    formType: "file",
    multiple: false,
    maxFiles: 1,
    minFiles: 1, // ✅ Minimum 1 image required
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
];
