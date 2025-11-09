// src/pages/orders/Orders.jsx
import { useEffect, useState, useCallback } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Table,
  Space,
  Tag,
  Modal,
  message,
  Typography,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { ordersAPI } from "../../api/endpoints";
import OrderForm from "./OrderForm";
import OrderComments from "./OrderComments";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const { user } = useSelector((s) => s.auth || {});
  const isAdmin =
    !!user &&
    ((user.role_title && user.role_title.toLowerCase() === "admin") ||
      user.is_admin);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await ordersAPI.getSummary();
      setOrders(res);
    } catch (err) {
      console.error(err);
      message.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders, refreshKey]);

  const openCommentsModal = (order) => {
    Modal.info({
      title: `Comments — Order #${order.id}`,
      width: 900,
      okText: "Close",
      content: (
        <div style={{ maxHeight: 520, overflow: "auto" }}>
          <OrderComments
            order={order}
            onUpdated={() => setRefreshKey((k) => k + 1)}
          />
        </div>
      ),
    });
  };

  const columns = [
    {
      title: "Order",
      dataIndex: "order_id",
      key: "order_id",
      render: (id) => `#${id}`,
    },
    { title: "Client", dataIndex: "client_name", key: "client_name" },
    { title: "Products", dataIndex: "total_products", key: "total_products" },
    {
      title: "Total Amount",
      dataIndex: "total_order_price",
      key: "total_order_price",
      render: (v) => `$${Number(v || 0).toFixed(2)}`,
    },
    {
      title: "Comment",
      dataIndex: "latest_comment",
      key: "latest_comment",
      ellipsis: true,
    },
    { title: "Created By", dataIndex: "created_by", key: "created_by" },
    {
      title: "Created At",
      dataIndex: "created_date",
      key: "created_date",
      render: (v) => new Date(v).toLocaleString(),
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      render: (v) => (
        <Tag color={v ? "green" : "red"}>{v ? "Active" : "Inactive"}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 160,
      render: (_, r) => (
        <Space>
          <Button
            size="small"
            onClick={() => openCommentsModal({ id: r.order_id })}
          >
            Comments
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Typography.Title level={3}>Orders</Typography.Title>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <div style={{ color: "#6b7280" }}>Total Orders</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{orders.length}</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <div style={{ color: "#6b7280" }}>Your Role</div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>
              {isAdmin ? "Admin" : user?.role_title || "User"}
            </div>
          </Card>
        </Col>
        <Col xs={24} md={12} style={{ textAlign: "right" }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setFormVisible(true)}
          >
            Create Order
          </Button>
        </Col>
      </Row>

      <Card>
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
        />
      </Card>

      <OrderForm
        visible={formVisible}
        onClose={() => setFormVisible(false)}
        onCreated={() => {
          setFormVisible(false);
          message.success("Order created");
          setRefreshKey((k) => k + 1);
        }}
      />
    </div>
  );
};

export default Orders;
