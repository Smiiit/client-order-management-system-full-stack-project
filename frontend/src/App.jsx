// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ConfigProvider } from "antd";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Products from "./pages/products/Products";
import MainLayout from "./components/layout/MainLayout";
import Clients from "./pages/clients/Clients";
import Orders from "./pages/orders/Orders";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Public Route Component (redirect to dashboard if authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#6366f1",
          borderRadius: 8,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* Protected Routes with MainLayout (includes Sidebar) */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="clients" element={<Clients />} />
            <Route path="orders" element={<Orders />} />

            <Route
              path="comments"
              element={
                <div style={{ padding: "2rem" }}>
                  <h2>Comments Page</h2>
                </div>
              }
            />
            <Route
              path="users"
              element={
                <div style={{ padding: "2rem" }}>
                  <h2>Users Page</h2>
                </div>
              }
            />
            <Route index element={<Navigate to="/dashboard" replace />} />
          </Route>

          {/* 404 Route */}
          <Route
            path="*"
            element={
              <div
                style={{
                  minHeight: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f9fafb",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <h1
                    style={{
                      fontSize: "3.75rem",
                      fontWeight: "bold",
                      color: "#1f2937",
                    }}
                  >
                    404
                  </h1>
                  <p
                    style={{
                      fontSize: "1.25rem",
                      color: "#4b5563",
                      marginTop: "1rem",
                    }}
                  >
                    Page not found
                  </p>
                  <a
                    href="/login"
                    style={{
                      display: "inline-block",
                      marginTop: "1.5rem",
                      padding: "0.75rem 1.5rem",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      borderRadius: "0.5rem",
                      textDecoration: "none",
                      transition: "background-color 0.2s",
                    }}
                  >
                    Go to Login
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
