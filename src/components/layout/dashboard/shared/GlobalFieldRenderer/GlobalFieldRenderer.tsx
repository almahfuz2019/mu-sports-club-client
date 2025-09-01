// components/FieldRenderer.tsx
import RichTextEditor from "@/components/editor";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import GlobalKeywordInput from "../inputs/GlobalKeywordInput/GlobalKeywordInput";
import { GenerateDataWithAi } from "@/helper/GenerateDataWithAi/GenerateDataWithAi";
import { useState } from "react";
import { Clock, Loader2, RefreshCcw } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { IFields } from "@/Type/IFields";
import GlobalImageUpload from "../GlobalImageUpload/GlobalImageUpload";

interface FieldRendererProps {
  fieldConfig: IFields[];
  metaData: Record<string, any>;
  setMetaData: (meta: Record<string, any>) => void;
  methods: any;
  setHistoryModal: (modal: { open: boolean; field: any }) => void;
  setMetaDataHistory: React.Dispatch<React.SetStateAction<any>>;
}

export default function GlobalFieldRenderer({
  fieldConfig,
  metaData,
  setMetaData,
  methods,
  setHistoryModal,
  setMetaDataHistory,
}: FieldRendererProps) {
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleUpdate = async (data: string, type: string) => {
    setUpdateLoading(true);
    try {
      // Use a different prompt for keywords
      const updatedCommand =
        type === "keywords"
          ? `Generate a list of relevant SEO keywords (separete with comma) based on this: ${metaData[data]}`
          : type === "richtext"
          ? `Generate a well-formatted description with HTML tags suitable for a rich text editor (like in MS Word). Include elements like <h1> to <h6>, <p>, <i>, <b>, <a>, <ul>, <li>, <ol>, and <u> based on this content: ${metaData[data]}`
          : `Update this: ${metaData[data]}`;

      const generatedContent = await GenerateDataWithAi(updatedCommand);

      const updatedMetaData = {
        ...metaData,
        [data]:
          type === "keywords"
            ? generatedContent.split(/\s*,\s*/).map((k) => k.trim())
            : generatedContent,
      };

      setMetaData(updatedMetaData);
      methods.setValue(data, updatedMetaData[data]);

      setMetaDataHistory((prev: any) => ({
        ...prev,
        [data]: [...(prev[data] || []), updatedMetaData[data]],
      }));
    } catch {
      console.log("Failed to generate content. Please try again.");
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <>
      {fieldConfig.map(
        ({
          label,
          valueKey,
          placeholder,
          type,
          required,
          multiple,
          minFiles,
          maxFiles,
        }) => {
          const field = {
            label,
            valueKey,
            placeholder,
            type,
            required,
            multiple,
            minFiles,
            maxFiles,
          };
          return (
            // ✅ Inside your map loop:
            <div className="" key={valueKey}>
              {type === "image" || (
                <TooltipProvider>
                  <div className="flex justify-end items-center gap-2 -mb-4 relative z-50">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          onClick={() => handleUpdate(valueKey, type)}
                          className="text-blue-500 hover:text-blue-600 cursor-pointer ml-auto"
                          disabled={updateLoading}
                        >
                          {updateLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <RefreshCcw className="w-4 h-4" />
                          )}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Update</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          onClick={() => setHistoryModal({ open: true, field })}
                          className="text-blue-500 hover:text-blue-600 cursor-pointer"
                        >
                          <Clock className="w-4 h-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>View History</TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
              )}
              {type === "text" && (
                <FormField
                  control={methods.control}
                  name={valueKey}
                  key={valueKey}
                  rules={{
                    required: required ? `${label} is required` : false,
                  }} // ✅ Add this line
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={placeholder}
                          {...field}
                          value={metaData[valueKey]}
                          onChange={(e) => {
                            field.onChange(e);
                            setMetaData({
                              ...metaData,
                              [valueKey]: e.target.value,
                            });
                          }}
                          className={`w-full h-40 border  ${
                            methods.formState.errors[valueKey]
                              ? "border-red-500"
                              : "border-gray-300"
                          } mt-1 rounded-none p-3`}
                        />
                      </FormControl>
                      {/* ✅ Show error message */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {type === "number" && (
                <FormField
                  control={methods.control}
                  name={valueKey}
                  key={valueKey}
                  rules={{
                    required: required ? `${label} is required` : false,
                    validate: required
                      ? (value: any) =>
                          parseFloat(value) >= 0 ||
                          `${label} must be a non-negative number`
                      : undefined,
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder={placeholder}
                          {...field}
                          value={metaData[valueKey]}
                          onChange={(e) => {
                            field.onChange(e);
                            setMetaData({
                              ...metaData,
                              [valueKey]: e.target.value,
                            });
                          }}
                          className={`w-full border ${
                            methods.formState.errors[valueKey]
                              ? "border-red-500"
                              : "border-gray-300"
                          }  mt-1 rounded-none p-3`}
                        />
                      </FormControl>

                      {/* ✅ Show error message */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {type === "richtext" && (
                <FormField
                  control={methods.control}
                  name={valueKey}
                  key={valueKey}
                  rules={{
                    required: required ? `${label} is required` : false, // ✅ Add required validation
                    validate: required
                      ? (value) => {
                          const strippedContent = value
                            .replace(/<[^>]*>/g, "")
                            .trim();
                          return (
                            strippedContent.length > 0 || `${label} is required`
                          );
                        }
                      : undefined,
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <RichTextEditor
                        content={metaData[valueKey]}
                        onChange={(content) => {
                          field.onChange(content);
                          setMetaData({
                            ...metaData,
                            [valueKey]: content,
                          });
                        }}
                      />
                      <FormMessage /> {/* ✅ Show validation error */}
                    </FormItem>
                  )}
                />
              )}

              {(type === "email" || type === "phone") && (
                <FormField
                  control={methods.control}
                  name={valueKey}
                  key={valueKey}
                  rules={{
                    required: required ? `${label} is required` : false,
                    ...(type === "email"
                      ? {
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // ✅ Email regex
                            message: "Invalid email address", // ✅ Email error
                          },
                        }
                      : {}),
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Input
                          type={type === "email" ? "email" : "tel"}
                          placeholder={placeholder}
                          {...field}
                          value={metaData[valueKey]}
                          onChange={(e) => {
                            field.onChange(e);
                            setMetaData({
                              ...metaData,
                              [valueKey]: e.target.value,
                            });
                          }}
                          className={`w-full border ${
                            methods.formState.errors[valueKey]
                              ? "border-red-500"
                              : "border-gray-300"
                          }  mt-1 rounded-none p-3`}
                        />
                      </FormControl>

                      {/* ✅ Show error message */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {type === "keywords" && (
                <FormField
                  control={methods.control}
                  name={valueKey}
                  key={valueKey}
                  rules={{
                    required: required ? `${label} is required` : false,
                    validate: required
                      ? (value) =>
                          Array.isArray(value) && value.length > 0
                            ? true
                            : `${label} is required`
                      : undefined,
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <GlobalKeywordInput
                        keywords={metaData?.[valueKey] || []}
                        onChange={(newKeywords) => {
                          field.onChange(newKeywords);
                          setMetaData({
                            ...metaData,
                            [valueKey]: newKeywords,
                          });
                        }}
                      />
                      <FormMessage /> {/* ✅ Show error message */}
                    </FormItem>
                  )}
                />
              )}

              {type === "image" && (
                <FormField
                  control={methods.control}
                  name={valueKey}
                  key={valueKey}
                  rules={{
                    required: required ? `${label} is required` : false,
                    validate: required
                      ? () =>
                          Array.isArray([valueKey]) &&
                          [valueKey].length >= (minFiles || 1)
                            ? true
                            : `${label} must have at least ${
                                minFiles || 1
                              } image${minFiles && minFiles > 1 ? "s" : ""}`
                      : undefined,
                  }}
                  render={({}) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <GlobalImageUpload
                        metaData={metaData}
                        setMetaData={setMetaData}
                        methods={methods}
                        valueKey={valueKey}
                        multiple={multiple}
                        minFiles={minFiles}
                        maxFiles={maxFiles}
                      />
                      <FormMessage /> {/* ✅ Displays validation error */}
                    </FormItem>
                  )}
                />
              )}
            </div>
          );
        }
      )}
    </>
  );
}
