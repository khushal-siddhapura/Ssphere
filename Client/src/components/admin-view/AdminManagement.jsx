import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useDispatch } from "react-redux";

const AdminManagement = () => {
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [filterAdmin, setFilterAdmin] = useState([]);
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");
  const dispatch = useDispatch();

  const fetchAdmins = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/getadminsdetails`
      );
      const data = await response.json();
      if (response.ok) {
        setAdmins(data);
      } else {
        toast({
          title: "Failed to fetch admin data",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Network error occurred while fetching admins",
      });
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const addAdmin = async () => {
    if (!newAdmin.name || !newAdmin.email || !newAdmin.password) return;

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/addadmin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: newAdmin.name,
            email: newAdmin.email,
            password: newAdmin.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Admin added successfully!",
        });
        setAdmins((prevAdmins) => [
          ...prevAdmins,
          {
            id: data.id,
            userName: newAdmin.name,
            email: newAdmin.email,
            status: "active",
          },
        ]); // Add the new admin to the table
        setNewAdmin({ name: "", email: "", password: "" });
      } else {
        toast({
          title: data?.message,
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Network error occurred while adding",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateAdmin = async () => {
    if (!newAdmin.name || !newAdmin.email || !newAdmin.password) return;
    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/updateadmin/${
          selectedAdmin._id
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: newAdmin.name,
            email: newAdmin.email,
            password: newAdmin.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Admin updated successfully!",
        });
        setAdmins((prevAdmins) =>
          prevAdmins.map((admin) =>
            admin.id === selectedAdmin._id
              ? { ...admin, userName: newAdmin.name, email: newAdmin.email }
              : admin
          )
        );
        setNewAdmin({ name: "", email: "", password: "" });
        setSelectedAdmin(null); // Reset selected admin after updating
      } else {
        toast({
          title: data?.message,
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Network error occurred while updating",
      });
    } finally {
      setLoading(false);
      fetchAdmins();
    }
  };

  const toggleAdminStatus = async (adminId, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "blocked" : "active";

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/manageadmins/${adminId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      if (response.ok) {
        const updatedAdmin = await response.json();
        setAdmins((prevAdmins) =>
          prevAdmins.map((admin) =>
            admin.id === adminId ? { ...admin, status: newStatus } : admin
          )
        );

        toast({
          title: `Admin ${
            newStatus === "active" ? "unblocked" : "blocked"
          } successfully!`,
        });
        fetchAdmins();
      } else {
        toast({
          title: "Failed to update admin status",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Network error occurred while updating",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (admin) => {
    setNewAdmin({ name: admin.userName, email: admin.email, password: "" });
    setSelectedAdmin(admin); // Set the selected admin for updating
  };

  const handleChange = (e) => {
    const status = e.target.value;
    setFilter(status);

    let filtredAdmindata;

    if (status === "all") {
      filtredAdmindata = admins;
    } else {
      filtredAdmindata = admins.filter((admin) => admin.status === status);
    }

    setFilterAdmin(filtredAdmindata);
  };

  useEffect(() => {
    if (filter === "all")
    {
      setFilterAdmin(admins);
    }else{
      const filterAdmins = admins.filter((admin) => admin.status === filter);
      setFilterAdmin(filterAdmins);
    }
  }, [admins,filter]);

  return (
    <div className="p-6 border border-gray-300 min-h-screen rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold mb-4">
          {selectedAdmin ? "Update Admin" : "Add New Admin"}
        </h2>
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
      {/* Add/Update Admin Form */}
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-lg font-semibold mb-3">
          {selectedAdmin ? "Update Admin Details" : "Admin Details"}
        </h3>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Admin Name"
            value={newAdmin.name}
            onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
            className="p-2 border rounded w-1/3"
          />
          <input
            type="email"
            placeholder="Admin Email"
            value={newAdmin.email}
            onChange={(e) =>
              setNewAdmin({ ...newAdmin, email: e.target.value })
            }
            className="p-2 border rounded w-1/3"
            autoComplete="new-email"
          />
          <input
            type="password"
            placeholder="Admin Password"
            value={newAdmin.password}
            onChange={(e) =>
              setNewAdmin({ ...newAdmin, password: e.target.value })
            }
            className="p-2 border rounded w-1/3"
            autoComplete="new-password"
          />
          <button
            onClick={selectedAdmin ? updateAdmin : addAdmin}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading
              ? selectedAdmin
                ? "Updating..."
                : "Adding..."
              : selectedAdmin
              ? "Update Admin"
              : "Add Admin"}
          </button>

          {selectedAdmin && (
            <button
              onClick={() => {
                setNewAdmin({ name: "", email: "", password: "" });
                setSelectedAdmin(null);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Admin List</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filterAdmin.length > 0 ? (
            filterAdmin.map((admin) => (
              <div
                key={admin._id}
                className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex flex-col items-start"
              >
                <h4 className="text-lg font-medium">{admin.userName}</h4>
                <p className="text-gray-500">{admin.email}</p>
                <span
                  className={`mt-2 px-3 py-1 text-sm font-medium rounded-full ${
                    admin.status === "blocked"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {admin.status}
                </span>
                <div className="mt-3 flex space-x-2">
                  <button
                    onClick={() => handleEdit(admin)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => toggleAdminStatus(admin._id, admin.status)}
                    className={`px-4 py-1 rounded text-white ${
                      admin.status === "blocked"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {admin.status === "blocked" ? "Unblock" : "Block"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>
              <p>No Data Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;
