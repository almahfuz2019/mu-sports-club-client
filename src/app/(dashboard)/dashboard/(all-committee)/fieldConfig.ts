import { IFields } from "@/Type/IFields";

export const fieldConfig: IFields[] = [
  {
    label: "Image",
    valueKey: "image",
    placeholder: "Upload a image",
    type: "image",
    formType: "file",
    multiple: true,
    maxFiles: 500,
    minFiles: 1, // ✅ Minimum 1 image required
    required: true,
  },
];
