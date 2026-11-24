import { useQuery } from "@tanstack/react-query";
import { DashboardSkeleton } from "@/components/ui/dashboard-skeletons";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TablePagination } from "@/components/ui/table-pagination";
import Swal from "sweetalert2";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
  paginatedUrl,
  paginatedResult,
  useServerPagination,
} from "../../../hooks/useServerPagination";

function UsersManagement() {
  // state
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { page, setPage, limit } = useServerPagination();

  useEffect(() => {
    setPage(1);
  }, [searchTerm, setPage]);

  // fetch data tanstack
  const { refetch, data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["users", searchTerm, page, limit],
    queryFn: async () => {
      const res = await axiosSecure.get(
        paginatedUrl("/users", { searchTerm }, { page, limit }),
      );

      return paginatedResult(res, { page, limit });
    },
  });

  const items = data?.items ?? [];
  const meta = data?.meta ?? {
    total: 0,
    page,
    limit,
    totalPages: 1,
  };

  if (isLoading || isFetching) {
    return <DashboardSkeleton />;
  }

  if (isError) {
    return <p className="text-center py-10">Failed to load users.</p>;
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchText.trim());
  };

  // handle make admin
  const handleMakeAdmin = (user) => {
    const roleInfo = { role: "admin" };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          title: "Success!",
          text: `${user.displayName} User make admin`,
          icon: "success",
        });
      }
    });
  };

  const handleRemoveAdmin = () => {};

  // handle delete
  const handleDelete = () => {};

  return (
    <div>
      {/* Header */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          User Management
        </h2>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex w-full max-w-sm gap-2">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              type="search"
              placeholder="Search users..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="h-11 w-full rounded-lg border bg-background pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <Button type="submit" className="h-11">
            Search
          </Button>
        </form>
      </div>
      <div className="rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-10 text-muted-foreground"
                >
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              items.map((user) => (
                <TableRow key={user._id}>
                  {/* User */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.name}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          {user.name?.charAt(0)}
                        </div>
                      )}

                      <p className="font-medium">{user.name}</p>
                    </div>
                  </TableCell>

                  {/* Email */}
                  <TableCell>{user.email}</TableCell>

                  {/* Role */}
                  <TableCell>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        user.role === "rider"
                          ? "bg-green-100 text-green-700"
                          : user.role === "admin"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </TableCell>

                  {/* Created */}
                  <TableCell>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </TableCell>

                  {/* Action */}
                  <TableCell>
                    <div className="flex gap-2">
                      {(user.role === "rider" || user.role === "user") && (
                        <Button
                          size="sm"
                          className="bg-green-100 text-green-700 hover:bg-green-200"
                          onClick={() => handleMakeAdmin(user)}
                        >
                          Make Rider
                        </Button>
                      )}

                      {user.role === "admin" && (
                        <Button
                          size="sm"
                          className="bg-green-100 text-green-700 hover:bg-green-200"
                          onClick={() => handleRemoveAdmin(user)}
                        >
                          Make User
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(user)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <TablePagination
          page={meta.page}
          totalPages={meta.totalPages}
          total={meta.total}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

export default UsersManagement;
