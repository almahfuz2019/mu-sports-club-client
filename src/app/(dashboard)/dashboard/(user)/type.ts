// Types
export interface IData {
  _id: string;
  name: string;
  email: string;
  isBanned: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Params {
  id: string;
}

// Types
export interface IFormInput {
  name: string;
  phone: string;
  email: string;
  address: string;
  discount: number;
}

export interface Params2 {
  slug: string;
}

export interface ManageCustomerTableProps {
  allSelected: boolean;
  handleSelectAll: (checked: boolean) => void;
  isLoading: boolean;
  status: string;
  loadingState: Record<string, boolean>;
  allData: IData[];
  selectedData: string[];
  handleSelect: (id: string) => void;
  handleStatusUpdate: (id: string, status: string) => void;
  handleUnBan: (id: string) => void;
  handleBan: (id: string) => void;
  unBanLoading: boolean;
  banLoading: boolean;
  limit: number;
  error: any;
  setStatus: (status: string) => void;
}
