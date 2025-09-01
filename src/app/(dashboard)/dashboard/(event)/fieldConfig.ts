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
    label: "Ticket Price",
    valueKey: "ticketPrice",
    placeholder: "Enter the ticket price",
    type: "number",
    formType: "number",
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
    label: "Registration Form Link",
    valueKey: "registrationFormLink",
    placeholder: "Enter the registration Form Link",
    type: "text",
    formType: "string",
    required: true,
  },

  {
    label: "Cover",
    valueKey: "cover",
    placeholder: "Upload a cover",
    type: "image",
    formType: "file",
    multiple: false,
    maxFiles: 1,
    minFiles: 1, // ✅ Minimum 1 image required
    required: false,
  },

  {
    label: "gallery",
    valueKey: "gallery",
    placeholder: "Upload a gallery",
    type: "image",
    formType: "file",
    multiple: true,
    maxFiles: 100,
    minFiles: 1, // ✅ Minimum 1 image required
    required: false,
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
