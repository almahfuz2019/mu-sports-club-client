"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MdCancel } from "react-icons/md";

interface MultiSelectProps {
  placeholder?: string;
  options: { label: string; value: string }[];
  value: string[];
  onChange: (value: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder = "Select options",
  options,
  value,
  onChange,
}) => {
  const toggleValue = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  const removeValue = (val: string) => {
    onChange(value.filter((v) => v !== val));
  };

  return (
    <div className="space-y-2">
      <Select
        value="" // reset to allow multiple selection
        onValueChange={toggleValue}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={value.includes(opt.value)}
                    readOnly
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <span>{opt.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Selected values as chips */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((val) => {
            const option = options.find((o) => o.value === val);
            return (
              <div
                key={val}
                className="flex items-center bg-gray-100 text-gray-900 px-3 py-1 mr-2 mb-2 rounded"
              >
                {option?.label}
                <button
                  type="button"
                  onClick={() => removeValue(val)}
                  className="ml-2 text-red-500 hover:text-red-600 cursor-pointer"
                >
                  <MdCancel />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
