import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Dialog } from "../../components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import axios from "axios";

const UserManagement = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [filterUsers, setFilterUsers] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/common/user`
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleBlockUser = async (userId) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/common/user/${userId}/status`,
        {
          status: "blocked",
        }
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId
            ? { ...user, status: response.data.user.status }
            : user
        )
      );

      toast({
        title: "User blocked successfully!",
      });
    } catch (error) {
      console.error("Error blocking user:", error);
      toast({
        title: "Failed to block user",
        variant: "destructive",
      });
    }
  };

  const handleUnblockUser = async (userId) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/common/user/${userId}/status`,
        {
          status: "active",
        }
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId
            ? { ...user, status: response.data.user.status }
            : user
        )
      );

      toast({
        title: "User unblocked successfully!",
      });
    } catch (error) {
      console.error("Error unblocking user:", error);
      toast({
        title: "Failed to unblock user",
        variant: "destructive",
      });
    }
  };
  const handleChange = (e) => {
    const status = e.target.value;
    setFilter(status);

    if (status === "all") {
      setFilterUsers(users);
    } else {
      const filteredUsersList = users.filter((user) => user.status === status);
      setFilterUsers(filteredUsersList);
    }
  };

  useEffect(() => {
    if (filter === "all") {
      setFilterUsers(users);
    } else {
      const filterUserData = users.filter((user) => user.status === filter);
      setFilterUsers(filterUserData);
    }
  }, [users, filter]);

  return (
    <div className="p-6 border border-gray-300 min-h-screen rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold mb-4">User Details</h2>
        <div className="ml-auto">
          <select
            className="border border-gray-500 p-2 rounded"
            onChange={handleChange}
          >
            <option value="all">All</option>
            <option value="blocked">Blocked</option>
            <option value="active">Active</option>
          </select>
        </div>
      </div>
      {/* User Table */}
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-lg font-semibold mb-3">User List</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterUsers && filterUsers.length > 0 ? (
              filterUsers.map((user) => (
                <TableRow key={user?._id}>
                  <TableCell>{user?._id}</TableCell>
                  <TableCell>{user?.userName}</TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell
                    className={`py-1 px-3 ${
                      user?.status === "blocked"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    <span
                      className={`mt-2 px-3 py-1 text-sm font-medium rounded-full ${
                        user?.status === "blocked"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {user?.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {user?.status === "blocked" ? (
                      <Button
                        onClick={() => handleUnblockUser(user._id)}
                        className="bg-green-500 text-white hover:bg-green-700"
                      >
                        Unblock
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleBlockUser(user._id)}
                        className="bg-red-500 text-white hover:bg-red-700"
                      >
                        Block
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="5" className="text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* User Details Dialog */}
      {openDetailsDialog && selectedUser && (
        <Dialog
          open={openDetailsDialog}
          onOpenChange={() => setOpenDetailsDialog(false)}
        >
          <Card className="p-4">
            <CardHeader>
              <CardTitle>User Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>User ID:</strong> {selectedUser._id}
              </p>
              <p>
                <strong>Name:</strong> {selectedUser.userName}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Status:</strong> {selectedUser.status}
              </p>
            </CardContent>
          </Card>
        </Dialog>
      )}
    </div>
  );
};

export default UserManagement;
