import { useQuery } from "@tanstack/react-query";
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

function UsersManagement() {
  const axiosSecure = useAxiosSecure();
  // fetch data tanstack

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center py-10">Loading users...</p>;
  }

  if (isError) {
    return <p className="text-center py-10">Failed to load users.</p>;
  }

  console.log("Users Management", users);

  const handleMakeRider = (user) => {
    console.log("Make rider:", user);
  };

  const handleDelete = (user) => {
    console.log("Delete:", user);
  };

  return (
    <div>
      <div className="text-4xl font-extrabold mb-5">
        Users Management {users.length}
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
            {users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-10 text-muted-foreground"
                >
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
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
                      {user.role !== "rider" && (
                        <Button
                          size="sm"
                          className="bg-green-100 text-green-700 hover:bg-green-200"
                          onClick={() => handleMakeRider(user)}
                        >
                          Make Rider
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
      </div>
    </div>
  );
}

export default UsersManagement;
