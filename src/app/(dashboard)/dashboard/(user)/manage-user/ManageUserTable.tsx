
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
  AtSign,
  CalendarDays,
  CircleArrowOutDownRight,
  MoreHorizontal,
  Slash,
  User,
  UserCog,
} from "lucide-react";
import { ManageCustomerTableProps } from "../type";

export default function ManageUserTable({
  allSelected,
  handleSelectAll,
  isLoading,
  loadingState,
  allData,
  selectedData,
  handleSelect,
  handleStatusUpdate,
  handleUnBan,
  limit,
  error,
  handleBan,
  unBanLoading,
  banLoading,
  setStatus,
  status,
}: ManageCustomerTableProps) {
  return (
    <Table className="mt-4 border border-gray-200">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[20px]">
            <Checkbox checked={allSelected} onCheckedChange={handleSelectAll} />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Create Date</TableHead>
          <TableHead>Role</TableHead>
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
              className={item.isBanned ? "bg-red-50 hover:bg-red-100" : ""}
            >
              <TableCell>
                <Checkbox
                  checked={selectedData.includes(item._id)}
                  onCheckedChange={() => handleSelect(item._id)}
                />
              </TableCell>
              <TableCell>
                <User size={16} className="text-emerald-600 inline mr-1" />
                <span>{item.name}</span>
              </TableCell>
              <TableCell>
                <AtSign size={16} className="text-blue-500 inline mr-1" />
                <span>{item.email}</span>
              </TableCell>
              <TableCell>
                <CalendarDays size={18} className="text-blue-600 inline mr-1" />
                {new Date(item.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <CircleArrowOutDownRight
                    size={16}
                    className={
                      item.role === "admin"
                        ? "text-amber-400"
                        : "text-purple-500"
                    }
                  />
                  <span>
                    {item.role === "admin" ? (
                      <span className="bg-amber-400 px-2 py-1 text-white rounded-sm">
                        {item.role}
                      </span>
                    ) : (
                      item.role
                    )}
                  </span>
                </div>
              </TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 rounded-full cursor-pointer">
                      <MoreHorizontal />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {/* Ban / Unban */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="flex items-center gap-2 text-orange-600 p-2 hover:bg-orange-50 w-full cursor-pointer">
                          <Slash className="w-4 h-4" />
                          {item.isBanned ? "Unban" : "Ban"}
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to{" "}
                            {item.isBanned ? "Unban" : "Ban"} this user?
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-orange-600 text-white"
                            onClick={
                              item.isBanned
                                ? () => handleUnBan(item._id)
                                : () => handleBan(item._id)
                            }
                            disabled={item.isBanned ? unBanLoading : banLoading}
                          >
                            {item.isBanned
                              ? unBanLoading
                                ? "Loading..."
                                : "Unban"
                              : banLoading
                              ? "Loading..."
                              : "Ban"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    {/* Update Status */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="flex items-center gap-2 text-blue-600 p-2 hover:bg-blue-50 w-full cursor-pointer">
                          <UserCog className="w-4 h-4" />
                          Status
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to update the user&#39;s
                            status?
                          </AlertDialogTitle>
                        </AlertDialogHeader>

                        {/* Status selection */}
                        <div className="mt-4">
                          <label
                            htmlFor="status"
                            className="block mb-1 text-sm font-medium text-gray-700"
                          >
                            Select New Status:
                          </label>
                          <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        </div>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-blue-600 text-white"
                            onClick={() => handleStatusUpdate(item._id, status)}
                            disabled={banLoading || unBanLoading}
                          >
                            {banLoading || unBanLoading
                              ? "Updating..."
                              : "Update"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
