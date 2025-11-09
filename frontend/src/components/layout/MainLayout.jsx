// src/components/layout/MainLayout.jsx
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, message } from "antd";
import {
  LogoutOutlined,
  UserOutlined,
  SettingOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { logoutUser } from "../../redux/slices/authSlice";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    message.success("Logged out successfully!");
    navigate("/login", { replace: true });
  };

  const userMenuItems = [
    {
      key: "profile",
      label: "Profile",
      icon: <UserOutlined />,
      onClick: () => navigate("/profile"),
    },
    {
      key: "settings",
      label: "Settings",
      icon: <SettingOutlined />,
      onClick: () => navigate("/settings"),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        {/* Top Header */}
        <header
          style={{
            backgroundColor: "white",
            padding: "1rem 2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#1f2937",
                margin: 0,
              }}
            >
              Client Management System
            </h1>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#6b7280",
                margin: "0.25rem 0 0 0",
              }}
            >
              Welcome back, {user?.name || "User"}!
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {/* Notifications */}
            <Button
              type="text"
              icon={<BellOutlined style={{ fontSize: "1.25rem" }} />}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
              }}
            />

            {/* User Dropdown */}
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              arrow
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  cursor: "pointer",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.5rem",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f3f4f6")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    backgroundColor: "#3b82f6",
                    borderRadius: "9999px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div style={{ textAlign: "left" }}>
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "0.875rem",
                      color: "#1f2937",
                      margin: 0,
                    }}
                  >
                    {user?.name || "User"}
                  </p>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "#6b7280",
                      margin: 0,
                    }}
                  >
                    {user?.role_title || "User"}
                  </p>
                </div>
              </div>
            </Dropdown>
          </div>
        </header>

        {/* Page Content */}
        <main
          style={{
            flex: 1,
            padding: "2rem",
            backgroundColor: "#f9fafb",
            overflow: "auto",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
