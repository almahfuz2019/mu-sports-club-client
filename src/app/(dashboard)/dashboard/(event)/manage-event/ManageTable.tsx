import Link from "next/link";
// UI Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Icons
import {
  CalendarDays,
  Eye,
  MoreHorizontal,
  Trash2,
  Undo2,
  UserCog,
  UserRound,
} from "lucide-react";
import { TableProps } from "../type";
import GlobalDelete from "@/components/layout/dashboard/shared/DeleteGlobal/GlobalDelete";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ManageTable({
  allSelected,
  handleSelectAll,
  isLoading,
  loadingState,
  allData,
  selectedData,
  handleSelect,
  handleDelete,
  isDeleting,
  setStatusForUpdate,
  handleStatusUpdate,
  handleUpdateTrash,
  isLoadingUpdateTrash,
  isUpdatingStatus,
  limit,
  isTrash,
  statusForUpdate,
  error,
}: TableProps) {
  return (
    <Table className="mt-4 border border-gray-200">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[20px]">
            <Checkbox checked={allSelected} onCheckedChange={handleSelectAll} />
          </TableHead>
          <TableHead>Cover</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Gallery</TableHead>
          <TableHead>Event Start Date</TableHead>
          <TableHead>Event End Date</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Sponsor</TableHead>
          <TableHead>Ticket Price</TableHead>
          <TableHead>Registration Form Link</TableHead>
          <TableHead>Create Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading || Object.values(loadingState).some(Boolean) ? (
          [...Array(limit)].map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-4 w-4 my-3 rounded" />
              </TableCell>
              {[...Array(4)].map((_, j) => (
                <TableCell key={j}>
                  <Skeleton className="h-4 w-28" />
                </TableCell>
              ))}
              <TableCell className="text-right">
                <Skeleton className="h-4 w-8 ml-auto" />
              </TableCell>
            </TableRow>
          ))
        ) : allData.length === 0 || error ? (
          <TableRow>
            <TableCell colSpan={20} className="text-center text-gray-500 py-8">
              No data found.
            </TableCell>
          </TableRow>
        ) : (
          allData.map((item) => (
            <TableRow
              key={item._id}
              className={
                item.status === "pending"
                  ? "bg-red-50 hover:bg-red-100"
                  : item.status === "published"
                  ? "bg-green-50 hover:bg-green-100"
                  : ""
              }
            >
              <TableCell>
                <Checkbox
                  checked={selectedData.includes(item._id)}
                  onCheckedChange={() => handleSelect(item._id)}
                />
              </TableCell>
              <TableCell>
                <Image
                  src={item.cover}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="object-cover rounded-md border"
                />
              </TableCell>
              <TableCell>
                <UserRound className="w-4 h-4 text-blue-600 inline mr-1" />
                {item.title}
              </TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="flex items-center gap-2 text-blue-600 p-2 hover:bg-blue-50 rounded">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </AlertDialogTrigger>

                  <AlertDialogContent className="max-w-xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle>{item.title}</AlertDialogTitle>
                    </AlertDialogHeader>

                    <div className="flex flex-wrap gap-4 mt-4">
                      {item.gallery?.map((img, index) => (
                        <Image
                          key={index}
                          src={img}
                          alt={`Committee Member ${index + 1}`}
                          width={80}
                          height={80}
                          className="object-cover rounded-md border"
                        />
                      ))}
                    </div>

                    <AlertDialogFooter className="mt-4">
                      <AlertDialogCancel className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                        Cancel
                      </AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
              <TableCell>
                <CalendarDays size={18} className="text-blue-600 inline mr-1" />
                {new Date(item.eventStartDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell>
                <CalendarDays size={18} className="text-blue-600 inline mr-1" />
                {new Date(item.eventEndDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell className="capitalize">
                <UserRound className="w-4 h-4 text-blue-600 inline mr-1" />
                {item.category?.title}
              </TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-blue-600 hover:text-blue-800 mt-1 hover:bg-transparent"
                    >
                      <Eye />
                      View
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>{item?.title}</AlertDialogTitle>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: item?.description,
                        }}
                      ></p>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-blue-600 hover:text-blue-800 mt-1 hover:bg-transparent"
                    >
                      <Eye />
                      View
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Sponsor</AlertDialogTitle>
                      <ul className="space-y-2 mt-3">
                        {item.sponsor?.map((sponsor) => (
                          <Link key={sponsor._id} href={sponsor.link}>
                            <li className="flex items-center gap-3 p-2 border rounded bg-gray-50 hover:bg-gray-100 transition my-1">
                              {sponsor.logo && (
                                <Image
                                  width={32}
                                  height={32}
                                  src={sponsor.logo}
                                  alt={sponsor.title}
                                  className="h-8 w-8 object-contain rounded"
                                />
                              )}
                              <span className="font-medium text-gray-800">
                                {sponsor.title}
                              </span>
                            </li>
                          </Link>
                        ))}
                      </ul>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
              <TableCell>
                <UserRound className="w-4 h-4 text-blue-600 inline mr-1" />
                {item.ticketPrice}
              </TableCell>
              <TableCell>
                <Link
                  href={item.registrationFormLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    className="text-blue-600 hover:text-blue-800 mt-1 hover:bg-transparent"
                  >
                    <Eye />
                    View
                  </Button>
                </Link>
              </TableCell>
              <TableCell>
                <CalendarDays size={18} className="text-blue-600 inline mr-1" />
                {new Date(item.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 rounded-full">
                      <MoreHorizontal />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Link
                      href={`/dashboard/update-event/${item.slug}`}
                      className="flex items-center gap-2 text-blue-600 p-2 hover:bg-blue-50"
                    >
                      <UserCog className="w-4 h-4" />
                      Edit
                    </Link>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="flex items-center gap-2 text-blue-600 p-2 hover:bg-blue-50">
                          <UserCog className="w-4 h-4" />
                          Status
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to update the status?
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <div className="mt-4">
                          <label
                            htmlFor="status"
                            className="block mb-1 text-sm font-medium text-gray-700"
                          >
                            Select New Status:
                          </label>
                          <select
                            id="status"
                            defaultValue={item?.status}
                            onChange={(e) => setStatusForUpdate(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {["pending", "published"].map((status) => (
                              <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() +
                                  status.slice(1)}
                              </option>
                            ))}
                          </select>
                        </div>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-blue-600 text-white"
                            onClick={() =>
                              handleStatusUpdate(item._id, statusForUpdate)
                            }
                            disabled={isUpdatingStatus}
                          >
                            {isUpdatingStatus ? "Updating..." : "Update"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          className={`flex items-center gap-2 p-2 text-sm w-full hover:bg-gray-100 ${
                            isTrash ? "text-blue-600" : "text-red-600"
                          }`}
                        >
                          {isTrash ? (
                            <Undo2 className="w-4 h-4" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                          {isTrash ? "Restore" : "Move to Trash"}
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            {isTrash
                              ? "Restore this booking?"
                              : "Move this booking to trash?"}
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className={
                              isTrash
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-red-600 hover:bg-red-700"
                            }
                            onClick={() => handleUpdateTrash(item._id)}
                            disabled={isLoadingUpdateTrash}
                          >
                            {isLoadingUpdateTrash
                              ? "Processing..."
                              : isTrash
                              ? "Restore"
                              : "Move to Trash"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    {isTrash && (
                      <GlobalDelete
                        onConfirm={() => handleDelete(item._id)}
                        validator={item.title}
                        loading={isDeleting}
                      />
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
