export interface IFields {
  label: string;
  valueKey: string;
  placeholder: string;
  type:
    | "text"
    | "richtext"
    | "keywords"
    | "number"
    | "email"
    | "phone"
    | "image";
  formType: "string" | "array" | "number" | "file";
  required?: boolean;
  multiple?: boolean;
  maxFiles?: number;
  minFiles?: number; // ✅ New field
}

export interface ParamsSlug {
  slug: string;
}
