// Types
export interface IData {
  _id: string;
  title: string;
  slug: string;
  image: string; // storing image (URL / file path)
  designation: string; // e.g., "President", "Secretary"
  startDate: Date;
  endDate: Date;
  committeeStatus: "student" | "other"; // committee type
  status: "pending" | "published";
  isPaid: boolean;
  isTrash: boolean;
  metaSeoTags: string[];
  metaSeoDescription: string;
  createdAt: string;
  updatedAt: string;
}

// Types
export interface IFormInput {
  title: string;
  image: string; // storing image (URL / file path)
  designation: string; // e.g., "President", "Secretary"
  startDate: Date;
  endDate: Date;
  committeeStatus: "student" | "other"; // committee type
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
