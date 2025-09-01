// Types
export interface IData {
  _id: string;
  slug: string;
  year: string; // unique batch/year
  image: string[]; // multiple images (URLs / file paths)
  status: "pending" | "published"; // publication status
  isPaid: boolean;
  isTrash: boolean;
  metaSeoTags: string[];
  metaSeoDescription: string;
  createdAt: string;
  updatedAt: string;
}

// Types
export interface IFormInput {
  year: string; // unique batch/year
  image: string[]; // multiple images (URLs / file paths)
}

export interface TableProps {
  allSelected: boolean;
  handleSelectAll: (checked: boolean) => void;
  isLoading: boolean;
  loadingState: Record<string, boolean>;
  allData: IData[];
  limit: number;
  selectedData: string[];
  isTrash: boolean;
  handleDelete: (id: string) => void;
  isDeleting: boolean;
  handleUpdateTrash: (id: string) => void;
  isLoadingUpdateTrash: boolean;
  handleSelect: (id: string) => void;
  setStatusForUpdate: (status: string) => void;
  handleStatusUpdate: (id: string, status: string) => void;
  isUpdatingStatus: boolean;
  statusForUpdate: string;
  error?: any;
}
