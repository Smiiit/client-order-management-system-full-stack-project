// src/components/layout/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  DashboardOutlined,
  ShoppingOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  CommentOutlined,
  TeamOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const Sidebar = () => {
  const user = useSelector((state) => state.auth.user);
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <DashboardOutlined />,
      path: "/dashboard",
      roles: ["Admin", "Manager", "User"], // Available to all
    },
    {
      key: "products",
      label: "Products",
      icon: <ShoppingOutlined />,
      path: "/products",
      roles: ["Admin", "Manager"],
    },
    {
      key: "clients",
      label: "Clients",
      icon: <UserOutlined />,
      path: "/clients",
      roles: ["Admin", "Manager"],
    },
    {
      key: "orders",
      label: "Orders",
      icon: <ShoppingCartOutlined />,
      path: "/orders",
      roles: ["Admin", "Manager", "User"],
    },
    {
      key: "comments",
      label: "Comments",
      icon: <CommentOutlined />,
      path: "/comments",
      roles: ["Admin", "Manager"],
    },
    {
      key: "users",
      label: "Users",
      icon: <TeamOutlined />,
      path: "/users",
      roles: ["Admin"],
    },
  ];

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(user?.role_title || "User")
  );

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-gray-900 text-white min-h-screen flex flex-col transition-all duration-300`}
      style={{
        backgroundColor: "#1f2937",
        color: "white",
        height: "100vh",
        position: "sticky",
        top: 0,
      }}
    >
      {/* Header */}
      <div
        className="p-4 flex items-center justify-between border-b border-gray-700"
        style={{
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #374151",
        }}
      >
        {!collapsed && (
          <h2
            className="text-xl font-bold"
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              color: "white",
            }}
          >
            CMS
          </h2>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:bg-gray-800 p-2 rounded"
          style={{
            color: "white",
            padding: "0.5rem",
            borderRadius: "0.375rem",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#1f2937")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
      </div>

      {/* Menu Items */}
      <nav
        className="flex-1 p-4 space-y-2"
        style={{
          flex: 1,
          padding: "1rem",
        }}
      >
        {filteredMenuItems.map((item) => (
          <NavLink
            key={item.key}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-all ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`
            }
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: collapsed ? "0" : "0.75rem",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              textDecoration: "none",
              transition: "all 0.2s",
              backgroundColor: isActive ? "#2563eb" : "transparent",
              color: isActive ? "white" : "#d1d5db",
              justifyContent: collapsed ? "center" : "flex-start",
            })}
          >
            <span style={{ fontSize: "1.25rem" }}>{item.icon}</span>
            {!collapsed && (
              <span
                style={{
                  fontSize: "0.95rem",
                  fontWeight: "500",
                }}
              >
                {item.label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Info at Bottom */}
      {!collapsed && user && (
        <div
          className="p-4 border-t border-gray-700"
          style={{
            padding: "1rem",
            borderTop: "1px solid #374151",
          }}
        >
          <div
            className="flex items-center gap-3"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <div
              className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                backgroundColor: "#2563eb",
                borderRadius: "9999px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.125rem",
                fontWeight: "bold",
              }}
            >
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <p
                className="font-semibold text-sm truncate"
                style={{
                  fontWeight: "600",
                  fontSize: "0.875rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  color: "white",
                }}
              >
                {user.name}
              </p>
              <p
                className="text-xs text-gray-400 truncate"
                style={{
                  fontSize: "0.75rem",
                  color: "#9ca3af",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user.role_title || "User"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
