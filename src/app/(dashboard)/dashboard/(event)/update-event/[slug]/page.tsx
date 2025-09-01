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
  useHandleFindSingleEventQuery,
  useHandleUpdateEventMutation,
} from "@/Redux/features/event/eventApi";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // must import the CSS
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultiSelect from "../../MultiSelect";
import { useHandleFindEventCategoryQuery } from "@/Redux/features/eventCategory/eventCategoryApi";
import { useHandleFindSponsorQuery } from "@/Redux/features/sponsor/sponsorApi";
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
  const [handleUpdateEvent, { isLoading, error }] =
    useHandleUpdateEventMutation();
  const { data: eventCategory, isLoading: isEventCategoryLoading } =
    useHandleFindEventCategoryQuery({
      page: 1,
      limit: 1000,
      search: "",
      status: "published",
      isTrash: false,
    });

  const { data: sponsor, isLoading: isUpdatingStatus } =
    useHandleFindSponsorQuery({
      page: 1,
      limit: 1000,
      search: "",
      status: "published",
      isTrash: false,
    });

  const allSponsor: any[] = sponsor?.payload?.data || [];

  const allEventCategory: any[] = eventCategory?.payload?.data || [];
  const router = useRouter();

  console.log({ error });

  const [historyModal, setHistoryModal] = useState<{
    open: boolean;
    field: any;
  }>({ open: false, field: null });

  const { data } = useHandleFindSingleEventQuery(slug);
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
        ticketPrice: Number(metaData?.ticketPrice),
        description: metaData?.description,
        registrationFormLink: metaData?.registrationFormLink,
        cover: metaData?.cover[0],
        gallery: metaData?.gallery,
        category: data?.category,
        sponsor: data?.sponsor,
        eventStartDate: data?.eventStartDate,
        eventEndDate: data?.eventEndDate,
        metaSeoTags: metaData?.metaSeoTags,
        metaSeoDescription: metaData?.metaSeoDescription,
      };

      console.log({ payload });
      await handleUpdateEvent({ id, payload }).unwrap();
      toast.success("Data updated successfully!");
      router.push("/dashboard/manage-event");
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
        ticketPrice: payload.ticketPrice || 0,
        description: payload.description || "",
        registrationFormLink: payload.registrationFormLink || "",
        category: payload.category || "",
        sponsor: payload.sponsor || "",
        eventStartDate: payload.eventStartDate || "",
        cover: Array.isArray(payload.cover)
          ? payload.cover
          : payload.cover
          ? [payload.cover]
          : [],
        gallery: Array.isArray(payload.gallery)
          ? payload.gallery
          : payload.gallery
          ? [payload.gallery]
          : [],
        eventEndDate: payload.eventEndDate || "",
        metaSeoTags: payload.metaSeoTags || [],
        metaSeoDescription: payload.metaSeoDescription || "",
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
        title="Update Event"
        subTitle="Edit the details of an existing event."
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
              name="eventStartDate"
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
              name="eventEndDate"
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
            <FormLabel>Event Category</FormLabel>
            <Controller
              name="category"
              control={methods.control}
              rules={{ required: "Category is required" }}
              render={({ field, fieldState }) => (
                <>
                  {isEventCategoryLoading ? (
                    <div className="w-full">
                      <div className="h-10 w-full rounded-md bg-gray-200 animate-pulse" />
                    </div>
                  ) : (
                    <Select
                      // Make sure the value matches category._id
                      value={
                        Array.isArray(field.value)
                          ? field.value[0] || ""
                          : field.value || ""
                      }
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {allEventCategory.map((category) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.title}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </>
              )}
            />
          </FormItem>

          <FormItem className="mb-4">
            <FormLabel>Sponsor</FormLabel>
            <Controller
              name="sponsor"
              control={methods.control}
              rules={{ required: "At least one sponsor is required" }}
              render={({ field, fieldState }) => (
                <>
                  {isUpdatingStatus ? (
                    <div className="w-full">
                      <div className="h-10 w-full rounded-md bg-gray-200 animate-pulse" />
                    </div>
                  ) : (
                    <MultiSelect
                      placeholder="Select Sponsors"
                      options={allSponsor.map((sponsor) => ({
                        label: sponsor.title,
                        value: sponsor._id,
                      }))}
                      value={field.value || []}
                      onChange={field.onChange}
                    />
                  )}
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
            {isLoading ? "Please Wait..." : "Update Event"}
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
