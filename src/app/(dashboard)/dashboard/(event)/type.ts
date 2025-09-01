// Types

interface ICategory {
  _id: string;
  title: string;
}
interface ISponsor {
  _id: string;
  title: string;
  logo: string;
  link: string;
}
export interface IData {
  _id: string;
  title: string;
  slug: string;
  ticketPrice: number;
  category: ICategory; // reference to EventCategory
  sponsor?: ISponsor[]; // references to Sponsor
  description: string;
  cover: string; // single image URL
  eventStartDate: Date;
  eventEndDate: Date;
  registrationFormLink: string;
  gallery?: string[]; // multiple image URLs
  status: "pending" | "published";
  isTrash: boolean;
  metaSeoTags: string[];
  metaSeoDescription: string;
  createdAt: string;
  updatedAt: string;
}

// Types
export interface IFormInput {
  title: string;
  ticketPrice: number;
  category: string; // reference to EventCategory
  sponsor?: string[]; // references to Sponsor
  description: string;
  cover: string; // single image URL
  eventStartDate: Date;
  eventEndDate: Date;
  registrationFormLink: string;
  gallery?: string[]; // multiple image URLs
  metaSeoTags: string[];
  metaSeoDescription: string;
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
