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
    label: "Description",
    valueKey: "description",
    placeholder: "Enter the description",
    type: "richtext",
    formType: "string",
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
  {
    label: "Meta SEO Tag",
    valueKey: "metaSeoTags",
    placeholder: "Enter the Meta SEO Tag",
    type: "keywords",
    formType: "array",
    required: false,
  },
  {
    label: "Meta SEO Description",
    valueKey: "metaSeoDescription",
    placeholder: "Enter the Meta SEO Tag",
    type: "text",
    formType: "string",
    required: false,
  },
];
