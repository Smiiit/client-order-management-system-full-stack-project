// src/pages/dashboard/Dashboard.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Typography,
  Space,
  Descriptions,
  Tag,
  Alert,
  Row,
  Col,
  Statistic,
} from "antd";
import {
  UserOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  ShoppingOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { getCurrentUser } from "../../redux/slices/authSlice";

const { Title, Text } = Typography;

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, token, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    // If user data is missing but we have a token, fetch user data
    if (token && !user) {
      console.log("📥 Token exists but user data missing. Fetching user...");
      dispatch(getCurrentUser());
    }
  }, [token, user, dispatch]);

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: "2rem" }}>
        <Title level={2} style={{ margin: 0, color: "#1f2937" }}>
          Dashboard Overview
        </Title>
        <Text style={{ color: "#6b7280", fontSize: "1rem" }}>
          Welcome back! Here's what's happening with your system.
        </Text>
      </div>

      {/* Stats Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: "2rem" }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Products"
              value={125}
              prefix={<ShoppingOutlined />}
              valueStyle={{ color: "#3b82f6" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Clients"
              value={48}
              prefix={<TeamOutlined />}
              valueStyle={{ color: "#10b981" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Orders"
              value={892}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: "#f59e0b" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Users"
              value={12}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#8b5cf6" }}
            />
          </Card>
        </Col>
      </Row>

      {/* User Info Card */}
      <Card style={{ marginBottom: "1.5rem" }} loading={loading}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
          }}
        >
          <Title level={4} style={{ margin: 0 }}>
            <UserOutlined style={{ marginRight: "0.5rem" }} />
            Your Profile Information
          </Title>
          {user ? (
            <Tag icon={<CheckCircleOutlined />} color="success">
              Authenticated
            </Tag>
          ) : (
            <Tag icon={<WarningOutlined />} color="warning">
              Loading...
            </Tag>
          )}
        </div>

        {user ? (
          <Descriptions bordered column={{ xs: 1, sm: 1, md: 2 }}>
            <Descriptions.Item label="User ID">
              {user.user_id || user.id || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Name">
              {user.name || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {user.email || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Role">
              <Tag color="blue">{user.role_title || user.role || "User"}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={user.is_active ? "green" : "red"}>
                {user.is_active ? "Active" : "Inactive"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Created Date">
              {user.created_date
                ? new Date(user.created_date).toLocaleDateString()
                : "N/A"}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <Alert
            message="User data is being loaded..."
            description="If this persists, please check your backend configuration"
            type="info"
            showIcon
          />
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
