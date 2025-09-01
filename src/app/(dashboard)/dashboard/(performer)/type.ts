// Types
export interface IData {
  _id: string;
  title: string;
  slug: string;
  team: string;
  position: string;
  point: number;
  image: string; // single image URL or file path
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
  team: string;
  position: string;
  point: number;
  image: string; // single image URL or file path
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
