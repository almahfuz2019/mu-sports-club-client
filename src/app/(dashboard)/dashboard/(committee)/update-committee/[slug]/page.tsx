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
import {
  useHandleFindSingleCommitteeQuery,
  useHandleUpdateCommitteeMutation,
} from "@/Redux/features/committee/committeeApi";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // must import the CSS
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
    useHandleUpdateCommitteeMutation();
  const router = useRouter();

  console.log({ error });

  const [historyModal, setHistoryModal] = useState<{
    open: boolean;
    field: any;
  }>({ open: false, field: null });

  const { data } = useHandleFindSingleCommitteeQuery(slug);
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
        designation: metaData?.designation,
        image: metaData?.image[0],
        startDate: data.startDate,
        endDate: data.endDate,
        committeeStatus: data.committeeStatus,
      };

      console.log({ payload });
      await handleUpdate({ id, payload }).unwrap();
      toast.success("Data updated successfully!");
      router.push("/dashboard/manage-committee");
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
        designation: payload.designation || "",
        image: Array.isArray(payload.image)
          ? payload.image
          : payload.image
          ? [payload.image]
          : [],
        startDate: payload.startDate || "",
        endDate: payload.endDate || "",
        committeeStatus: payload.committeeStatus || "",
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
        title="Update Committee"
        subTitle="Edit the details of an existing committee."
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
            <FormLabel>Start Date</FormLabel>
            <Controller
              name="startDate"
              control={methods.control}
              rules={{ required: "Start Date is required" }}
              render={({ field, fieldState }) => {
                // field.value is string | null (incorrect)
                // So parse it to Date or default to null
                const selectedDate = field.value ? new Date(field.value) : null;

                return (
                  <>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => {
                        // onChange expects Date | null
                        // Store date as ISO string in form state for consistency
                        field.onChange(
                          date ? date.toISOString().split("T")[0] : null
                        );
                      }}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Select a date"
                      className="w-full border rounded px-3 py-2"
                    />
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </>
                );
              }}
            />
          </FormItem>
          <FormItem className="mb-4">
            <FormLabel>End Date</FormLabel>
            <Controller
              name="endDate"
              control={methods.control}
              rules={{ required: "End Date is required" }}
              render={({ field, fieldState }) => {
                // field.value is string | null (incorrect)
                // So parse it to Date or default to null
                const selectedDate = field.value ? new Date(field.value) : null;

                return (
                  <>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => {
                        // onChange expects Date | null
                        // Store date as ISO string in form state for consistency
                        field.onChange(
                          date ? date.toISOString().split("T")[0] : null
                        );
                      }}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Select a date"
                      className="w-full border rounded px-3 py-2"
                    />
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </>
                );
              }}
            />
          </FormItem>
          <FormItem className="mb-4">
            <FormLabel>Committee Type</FormLabel>
            <Controller
              name="committeeStatus"
              control={methods.control}
              rules={{ required: "Type is required" }}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    value={field.value || ""}
                    onValueChange={(value) =>
                      field.onChange(value as "student" | "other")
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </>
              )}
            />
          </FormItem>
          <Button
            type="submit"
            disabled={isLoading}
            className={`rounded-none mr-5 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Please Wait..." : "Update Sponsor"}
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
