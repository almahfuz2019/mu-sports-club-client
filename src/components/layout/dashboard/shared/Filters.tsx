import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import Heading from "@/components/layout/dashboard/shared/heading";

interface FiltersProps {
  searchRef: any;
  handleSearch: () => void;
  limit: number;
  totalCount: number;
  handleLimitChange: React.ChangeEventHandler<HTMLSelectElement>;
  headingTitle: string;
  headingSubtitle: string;
  isError: boolean;
}

export default function Filters({
  searchRef,
  handleSearch,
  limit,
  isError,
  handleLimitChange,
  headingTitle,
  headingSubtitle,
  totalCount,
}: FiltersProps) {
  return (
    <div>
      {/* Heading */}
      <div className="mb-5 flex justify-between flex-wrap gap-4 lg:gap-0">
        <Heading title={headingTitle} subTitle={headingSubtitle} />
        {/* Filters Section */}
        <div className="flex flex-row flex-wrap items-start sm:items-center gap-4">
          <div className="flex gap-2 w-[350px] sm:flex-1 ">
            <Input ref={searchRef} placeholder="Search here..." />
            <Button onClick={handleSearch}>Search</Button>
          </div>
          <Button variant="outline">
            Total Data {isError ? 0 : totalCount || 0}
          </Button>
          <div className="flex items-center gap-2">
            <label htmlFor="limit" className="text-sm font-medium">
              Rows:
            </label>
            <select
              id="limit"
              value={limit}
              onChange={handleLimitChange}
              className="border border-gray-300 px-2 py-1 cursor-pointer"
            >
              {[5, 10, 25, 50, 100].map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
