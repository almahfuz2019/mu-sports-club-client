"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Heading from "@/components/layout/dashboard/shared/heading";
import { Button } from "@/components/ui/button";
import GlobalHistoryModal from "@/components/layout/dashboard/shared/GlobalHistoryModal/GlobalHistoryModal";
import GlobalFieldRenderer from "@/components/layout/dashboard/shared/GlobalFieldRenderer/GlobalFieldRenderer";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { GlobalAICommandInput } from "@/components/layout/dashboard/shared/inputs/GlobalAICommandInput/GlobalAICommandInput";
import { Form, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ParamsSlug } from "@/Type/IFields";
import { IFormInput } from "../../type";
import { fieldConfig } from "../../fieldConfig";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // must import the CSS
import { useHandleFindSingleAchievementQuery, useHandleUpdateAchievementMutation } from "@/Redux/features/achievement/achievementApi";

const getInitialMetaData = () => {
  return fieldConfig.reduce((acc, field) => {
    if (field.formType === "array") {
      acc[field.valueKey] = [];
    } else {
      acc[field.valueKey] = "";
    }
    return acc;
  }, {} as Record<string, any>);
};

const getInitialMetaDataHistory = () => {
  return fieldConfig.reduce((acc, field) => {
    if (field.formType === "array") {
      acc[field.valueKey] = [[]];
    } else {
      acc[field.valueKey] = [];
    }
    return acc;
  }, {} as Record<string, any>);
};

const UpdatePage: React.FC<{ params: Promise<ParamsSlug> }> = ({ params }) => {
  const [slug, setSlug] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [metaData, setMetaData] = useState(getInitialMetaData);
  const [metaDataHistory, setMetaDataHistory] = useState(
    getInitialMetaDataHistory
  );
  const [handleUpdate, { isLoading, error }] =
    useHandleUpdateAchievementMutation();
  const router = useRouter();

  console.log({ error });

  const [historyModal, setHistoryModal] = useState<{
    open: boolean;
    field: any;
  }>({ open: false, field: null });

  const { data } = useHandleFindSingleAchievementQuery(slug);
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    resolveParams();
  }, [params]);

  const defaultValues = fieldConfig.reduce((acc, field) => {
    if (field.formType === "array") acc[field.valueKey] = [];
    else acc[field.valueKey] = "";
    return acc;
  }, {} as Record<string, any>);

  const methods = useForm<IFormInput>({ defaultValues });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const payload = {
        title: metaData?.title,
        description: metaData?.description,
        year: data.year,
        image: metaData?.image[0],
        metaSeoTags: metaData?.metaSeoTags,
        metaSeoDescription: metaData?.metaSeoDescription,
      };

      console.log({ payload });
      await handleUpdate({ id, payload }).unwrap();
      toast.success("Data updated successfully!");
      router.push("/dashboard/manage-achievement");
    } catch (error: any) {
      console.error({ error });
      toast.error(error?.data?.payload?.message || "An error occurred");
    }
  };

  console.log(data);

  useEffect(() => {
    if (data?.payload) {
      const payload = data.payload;
      const newData = {
        title: payload.title || "",
        description: payload.description || "",
        year: payload.year || "",
        metaSeoTags: payload.metaSeoTags || "",
        metaSeoDescription: payload.metaSeoDescription || "",
        image: Array.isArray(payload.image)
          ? payload.image
          : payload.image
          ? [payload.image]
          : [],
      };
      setMetaData(newData);
      setMetaDataHistory(newData);
      methods.reset(newData);
      setId(payload._id);
    }
  }, [data, methods]);

  return (
    <div>
      <Heading
        title="Update Achievement"
        subTitle="Edit the details of an existing achievement."
      />
      <Form {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="pt-5 lg:pt-7 lg:w-[60%] space-y-10"
        >
          <GlobalFieldRenderer
            fieldConfig={fieldConfig}
            metaData={metaData}
            setMetaData={setMetaData}
            methods={methods}
            setHistoryModal={setHistoryModal}
            setMetaDataHistory={setMetaDataHistory}
          />
          <FormItem className="mb-4">
            <FormLabel>Year</FormLabel>
            <Controller
              name="year"
              control={methods.control}
              rules={{ required: "Year is required" }}
              render={({ field, fieldState }) => {
                // Parse stored value (string) to Date for DatePicker
                const selectedYear = field.value
                  ? new Date(`${field.value}-01-01`)
                  : null;

                return (
                  <>
                    <DatePicker
                      selected={selectedYear}
                      onChange={(date) => {
                        // Store only the year as string in form state
                       field.onChange(
                         date ? date.getFullYear().toString() : null
                       );
                      }}
                      showYearPicker
                      dateFormat="yyyy"
                      placeholderText="Select a year"
                      className="w-full border rounded px-3 py-2"
                    />
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </>
                );
              }}
            />
          </FormItem>

          <Button
            type="submit"
            disabled={isLoading}
            className={`rounded-none mr-5 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Please Wait..." : "Update Achievement"}
          </Button>

          <GlobalAICommandInput
            metaData={metaData}
            setMetaData={setMetaData}
            setMetaDataHistory={setMetaDataHistory}
            methods={methods}
            fieldConfig={fieldConfig}
          />
        </form>
      </Form>
      <GlobalHistoryModal
        historyModal={historyModal}
        metaData={metaData}
        metaDataHistory={metaDataHistory}
        setMetaData={setMetaData}
        setHistoryModal={setHistoryModal}
        methods={methods}
      />
    </div>
  );
};

export default UpdatePage;
