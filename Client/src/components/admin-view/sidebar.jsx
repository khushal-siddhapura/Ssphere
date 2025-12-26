import {
  BadgeCheck,
  ChartNoAxesCombined,
  ImageIcon,
  LineChart,
  MessageSquare,
  ShoppingBasket,
  UserCog,
  Users,
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { FaTachometerAlt } from "react-icons/fa";
import { BarChart } from "recharts";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <FaTachometerAlt size={24} />,
  },
  {
    id: "adminManage",
    label: "Admin",
    path: "/admin/manageadmins",
    icon: <UserCog />,
  },
  {
    id: "userManage",
    label: "Users",
    path: "/admin/user",
    icon: <Users />,
  },
  {
    id: "sales",
    label: "Sales",
    path: "/admin/sales",
    icon: <LineChart />,
  },

  {
    id: "banner",
    label: "Banner",
    path: "/admin/banner",
    icon: <ImageIcon />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
  {
    id: "complaint",
    label: "Complaints",
    path: "/admin/complaint",
    icon: <MessageSquare />,
  },
];

function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  const user = getUser(); // Get the role of the current user

  // Conditionally filter menu items based on user role
  const filteredMenuItems = adminSidebarMenuItems.filter((menuItem) => {
    if (user?.role === "superadmin") {
      return true; // Superadmin sees everything
    } else if (user?.role === "admin") {
      // Admin doesn't see these items
      return (
        menuItem.id !== "dashboard" &&
        menuItem.id !== "adminManage" &&
        menuItem.id !== "userManage" &&
        menuItem.id !== "sales"
      );
    } else {
      return false; // Hide all items if user role is not recognized
    }
  });

  return (
    <nav className="mt-8 flex-col flex gap-2">
      {filteredMenuItems?.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen ? setOpen(false) : null;
          }}
          className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();
  const user = getUser(); 
  const panelTitle = user?.role === "superadmin" ? "SuperAdmin Panel" : "Admin Panel";

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-2xl font-extrabold">{panelTitle}</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/banner")}
          className="flex cursor-pointer items-center gap-2"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold">{panelTitle}</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}


export default AdminSideBar;