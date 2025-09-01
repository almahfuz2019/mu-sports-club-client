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
    label: "Team",
    valueKey: "team",
    placeholder: "Enter the team",
    type: "text",
    formType: "string",
    required: true,
  },
  {
    label: "Position",
    valueKey: "position",
    placeholder: "Enter the position",
    type: "text",
    formType: "string",
    required: true,
  },
  {
    label: "Point",
    valueKey: "point",
    placeholder: "Enter the point",
    type: "number",
    formType: "number",
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
];
