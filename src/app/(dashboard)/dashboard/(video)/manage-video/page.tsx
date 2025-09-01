"use client";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Filters from "@/components/layout/dashboard/shared/Filters";
import { GlobalPagination } from "@/components/layout/dashboard/shared/GlobalPagination/GlobalPagination";
import { baseURL } from "@/Redux/api/baseApi";
import ManageTable from "./ManageTable";
import { IData } from "../type";
import {
  useHandleDeleteVideoMutation,
  useHandleFindVideoQuery,
  useHandleUpdateVideoStatusMutation,
  useHandleUpdateVideoTrashMutation,
} from "@/Redux/features/video/videoApi";

const ManagePage = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const searchRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("");
  const [isPaid, setIsPaid] = useState<boolean | null>(null);
  const [statusForUpdate, setStatusForUpdate] = useState("");
  const [selectedData, setSelectedData] = useState<string[]>([]);
  const [isTrash, setIsTrash] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState({
    searching: false,
    pageChange: false,
    limitChange: false,
  });

  const { data, isLoading, error, isError } = useHandleFindVideoQuery({
    page: currentPage,
    limit,
    search: searchText,
    status,
    isTrash,
    isPaid,
  });

  const [handleUpdateVideoStatus, { isLoading: isUpdatingStatus }] =
    useHandleUpdateVideoStatusMutation();

  const [handleUpdateVideoTrash, { isLoading: isLoadingUpdateTrash }] =
    useHandleUpdateVideoTrashMutation();

  const [handleDeleteVideo, { isLoading: isDeleting }] =
    useHandleDeleteVideoMutation();

  const allData: IData[] = data?.payload?.data || [];
  const totalPages = data?.payload?.pagination?.totalPages || 1;
  const allSelected =
    allData.length > 0 && selectedData.length === allData.length;

  const handleSelectAll = () => {
    setSelectedData(allSelected ? [] : allData.map((item) => item._id));
  };

  const handleSelect = (id: string) => {
    setSelectedData((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSearch = async () => {
    setLoadingState((prev) => ({ ...prev, searching: true }));
    const trimmed = searchRef.current?.value.trim() || "";
    setSearchText(trimmed);
    setCurrentPage(1);
    toast.success(`Searching for "${trimmed || "all"}"`);
    setLoadingState((prev) => ({ ...prev, searching: false }));
  };

  const handlePageChange = async (page: number) => {
    if (page < 1 || page > totalPages) return;
    setLoadingState((prev) => ({ ...prev, pageChange: true }));
    setCurrentPage(page);
    setLoadingState((prev) => ({ ...prev, pageChange: false }));
  };

  const handleLimitChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoadingState((prev) => ({ ...prev, limitChange: true }));
    setLimit(Number(e.target.value));
    setCurrentPage(1);
    setLoadingState((prev) => ({ ...prev, limitChange: false }));
  };

  const handleStatusUpdate = async (id: string, statusForUpdate: string) => {
    try {
      await handleUpdateVideoStatus({
        id,
        status: statusForUpdate,
      }).unwrap();
      toast.success("Successfully updated status!");
    } catch (error: any) {
      const errorMessage =
        error?.data?.payload?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  const handleUpdateTrash = async (id: string) => {
    try {
      const data = { id, isTrash: !isTrash };
      await handleUpdateVideoTrash(data).unwrap();
      toast.success("Successfully updated trash status!");
    } catch (error: any) {
      const errorMessage =
        error?.data?.payload?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await handleDeleteVideo(id).unwrap();
      toast.success("Successfully deleted data!");
    } catch (error: any) {
      const errorMessage =
        error?.data?.payload?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  const handleDownloadExcel = () => {
    const params = new URLSearchParams({
      name: searchText,
      status,
      isTrash: isTrash.toString(),
    }).toString();
    const url = `${baseURL}/video/download-excel?${params}`;
    window.open(url, "_blank");
  };

  console.log({ type: isPaid });

  return (
    <div>
      <Filters
        searchRef={searchRef}
        handleSearch={handleSearch}
        limit={limit}
        totalCount={data?.payload?.pagination?.totalCount || 0}
        isError={isError}
        handleLimitChange={handleLimitChange}
        headingTitle="Manage Videos"
        headingSubtitle="Manage all your videos. You can add, or edit them."
      />

      <div className="flex flex-wrap gap-2">
        {[
          { label: "All", value: false },
          { label: "Trash", value: true, resetStatus: true },
        ].map(({ label, value, resetStatus }) => (
          <Button
            key={label}
            variant={isTrash === value ? "default" : "secondary"}
            onClick={() => {
              setIsTrash(value);
              if (resetStatus) setStatus("");
            }}
          >
            {label}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 my-5">
        {[
          { label: "All", value: null },
          { label: "Unpaid", value: false },
          { label: "Paid", value: true },
        ].map(({ label, value }) => (
          <Button
            key={label}
            variant={isPaid === value ? "default" : "secondary"}
            onClick={() => setIsPaid(value)}
          >
            {label}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {["All", "Published", "Pending"].map((label) => {
          const value = label === "All" ? "" : label.toLowerCase();
          const isActive = status === value && !isTrash;

          return (
            <Button
              key={label}
              variant={isActive ? "default" : "secondary"}
              onClick={() => setStatus(value)}
              disabled={isTrash} // disable status buttons if trash is active
            >
              {label}
            </Button>
          );
        })}

        <Button
          onClick={handleDownloadExcel}
          className="bg-green-600 text-white hover:bg-green-700"
        >
          Download Excel
        </Button>
      </div>

      <ManageTable
        allSelected={allSelected}
        handleSelectAll={handleSelectAll}
        isLoading={isLoading}
        handleUpdateTrash={handleUpdateTrash}
        isLoadingUpdateTrash={isLoadingUpdateTrash}
        loadingState={loadingState}
        allData={allData}
        selectedData={selectedData}
        handleSelect={handleSelect}
        setStatusForUpdate={setStatusForUpdate}
        handleStatusUpdate={handleStatusUpdate}
        handleDelete={handleDelete}
        isDeleting={isDeleting}
        isUpdatingStatus={isUpdatingStatus}
        isTrash={isTrash}
        limit={limit}
        statusForUpdate={statusForUpdate}
        error={error}
      />

      <GlobalPagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        selectedCount={selectedData.length}
        totalCount={allData.length}
        className="sm:justify-end justify-center"
      />
    </div>
  );
};

export default ManagePage;
