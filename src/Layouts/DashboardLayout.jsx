import { Outlet, NavLink } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const DashboardLayout = () => {
  const { role, logout } = useContext(AuthContext);

  const userMenu = [
    { name: "Home", path: "/dashboard" },
    { name: "Profile", path: "/dashboard/profile" },
    { name: "Add Item", path: "/dashboard/add-item" },
    { name: "My Items", path: "/dashboard/my-items" },
  ];

  const adminMenu = [
    { name: "Home", path: "/admin" },
    { name: "Manage Users", path: "/admin/manage-users" },
    { name: "Manage Items", path: "/admin/manage-items" },
    { name: "Reports", path: "/admin/reports" },
  ];

  const menu = role === "admin" ? adminMenu : userMenu;

  return (
    <div className="flex min-h-screen mt-10">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold mb-4">{role.toUpperCase()} DASHBOARD</h1>
        <ul className="flex flex-col gap-2">
          {menu.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block p-2 rounded hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={logout}
              className="mt-4 w-full bg-red-600 p-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
