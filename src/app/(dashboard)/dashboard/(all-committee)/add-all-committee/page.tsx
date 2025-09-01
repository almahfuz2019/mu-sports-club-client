"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Heading from "@/components/layout/dashboard/shared/heading";
import { Button } from "@/components/ui/button";
import GlobalHistoryModal from "@/components/layout/dashboard/shared/GlobalHistoryModal/GlobalHistoryModal";
import GlobalFieldRenderer from "@/components/layout/dashboard/shared/GlobalFieldRenderer/GlobalFieldRenderer";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { GlobalAICommandInput } from "@/components/layout/dashboard/shared/inputs/GlobalAICommandInput/GlobalAICommandInput";
import { Form, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { IFormInput } from "../type";
import { fieldConfig } from "../fieldConfig";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // must import the CSS
import { useHandleCreateAllCommitteeMutation } from "@/Redux/features/allCommittee/allCommittee";

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

const AddPage = () => {
  const [metaData, setMetaData] = useState(getInitialMetaData);
  const [metaDataHistory, setMetaDataHistory] = useState(
    getInitialMetaDataHistory
  );

  const [handleCreate, { isLoading, error }] =
    useHandleCreateAllCommitteeMutation();
  const router = useRouter();

  const [historyModal, setHistoryModal] = useState<{
    open: boolean;
    field: any;
  }>({
    open: false,
    field: null,
  });

  const defaultValues = getInitialMetaData();

  const methods = useForm<IFormInput>({ defaultValues });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const payload = {
        image: metaData?.image,
        year: data.year,
      };

      console.log({ payload });

      await handleCreate(payload).unwrap();

      toast.success("Data added successfully!");
      router.push("/dashboard/manage-all-committee");
    } catch (error: any) {
      console.error("Error adding:", error);

      const apiErrorMessage =
        error?.data?.payload[0]?.message ||
        error?.data?.message ||
        "Something went wrong. Please try again.";

      toast.error(apiErrorMessage);
    }
  };

  console.log({ error });

  return (
    <div>
      <Heading
        title="Add All Committee"
        subTitle="Enter information to add a new All Committee to the list."
      />
      <Form {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="pt-5 lg:pt-7 lg:w-[60%] space-y-10"
        >
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

          <GlobalFieldRenderer
            fieldConfig={fieldConfig}
            metaData={metaData}
            setMetaData={setMetaData}
            methods={methods}
            setHistoryModal={setHistoryModal}
            setMetaDataHistory={setMetaDataHistory}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className={`rounded-none mr-5 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Please Wait..." : "Add All Committee"}
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

export default AddPage;
