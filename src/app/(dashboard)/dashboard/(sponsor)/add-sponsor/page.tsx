"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Heading from "@/components/layout/dashboard/shared/heading";
import { Button } from "@/components/ui/button";
import GlobalHistoryModal from "@/components/layout/dashboard/shared/GlobalHistoryModal/GlobalHistoryModal";
import GlobalFieldRenderer from "@/components/layout/dashboard/shared/GlobalFieldRenderer/GlobalFieldRenderer";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { GlobalAICommandInput } from "@/components/layout/dashboard/shared/inputs/GlobalAICommandInput/GlobalAICommandInput";
import { Form } from "@/components/ui/form";
import { IFormInput } from "../type";
import { fieldConfig } from "../fieldConfig";
import { useHandleCreateSponsorMutation } from "@/Redux/features/sponsor/sponsorApi";

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

  const [handleCreateSponsor, { isLoading, error }] =
    useHandleCreateSponsorMutation();
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

  const onSubmit: SubmitHandler<IFormInput> = async () => {
    try {
      const payload = {
        title: metaData?.title,
        link: metaData?.link,
        logo: metaData?.logo[0],
        metaSeoTags: metaData?.metaSeoTags,
        metaSeoDescription: metaData?.metaSeoDescription,
      };

      console.log({ payload });

      await handleCreateSponsor(payload).unwrap();

      toast.success("Data added successfully!");
      router.push("/dashboard/manage-sponsor");
    } catch (error: any) {
      console.error("Error adding:", error);

      const apiErrorMessage =
        error?.data?.payload[0]?.message ||
        "Something went wrong. Please try again.";

      toast.error(apiErrorMessage);
    }
  };

  console.log({ error });

  return (
    <div>
      <Heading
        title="Add Sponsor"
        subTitle="Enter information to add a new Sponsor to the list."
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

          <Button
            type="submit"
            disabled={isLoading}
            className={`rounded-none mr-5 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Please Wait..." : "Add Sponsor"}
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
