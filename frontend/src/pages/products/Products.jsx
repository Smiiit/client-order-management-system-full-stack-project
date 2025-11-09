// src/pages/products/Products.jsx
import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
  Space,
  Popconfirm,
  Tag,
  Card,
  Row,
  Col,
  Statistic,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  ShoppingOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { productsAPI } from "../../api/endpoints";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [form] = Form.useForm();

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productsAPI.getAll();
      // Backend returns array directly, so use it as is
      setProducts(Array.isArray(response) ? response : []);
    } catch (error) {
      message.error("Failed to fetch products");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingProduct(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingProduct(record);
    form.setFieldsValue({
      name: record.name,
      description: record.description,
      price: record.price,
      stock: record.stock,
      sku: record.sku,
    });
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await productsAPI.delete(id);
      message.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      message.error("Failed to delete product");
      console.error("Delete error:", error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingProduct) {
        await productsAPI.update(editingProduct.id, values);
        message.success("Product updated successfully");
      } else {
        await productsAPI.create(values);
        message.success("Product created successfully");
      }
      setModalVisible(false);
      form.resetFields();
      fetchProducts();
    } catch (error) {
      message.error(
        editingProduct ? "Failed to update product" : "Failed to create product"
      );
      console.error("Submit error:", error);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
    setEditingProduct(null);
  };

  // Filter products based on search
  const filteredProducts = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchText.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchText.toLowerCase())
  );

  // Calculate statistics
  const totalProducts = products.length;
  const totalValue = products.reduce(
    (sum, p) => sum + (p.price * p.stock || 0),
    0
  );
  const lowStock = products.filter((p) => p.stock < 10).length;
  const avgPrice =
    totalProducts > 0
      ? (
          products.reduce((sum, p) => sum + (p.price || 0), 0) / totalProducts
        ).toFixed(2)
      : 0;

  const columns = [
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      width: 120,
      render: (sku) => <Tag color="blue">{sku || "N/A"}</Tag>,
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      width: 200,
      sorter: (a, b) => (a.name || "").localeCompare(b.name || ""),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      render: (text) => text || "-",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 120,
      sorter: (a, b) => (a.price || 0) - (b.price || 0),
      render: (price) => (
        <span style={{ fontWeight: "600", color: "#10b981" }}>
          ${Number(price || 0).toFixed(2)}
        </span>
      ),
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      width: 100,
      sorter: (a, b) => (a.stock || 0) - (b.stock || 0),
      render: (stock) => (
        <Tag color={stock < 10 ? "red" : stock < 50 ? "orange" : "green"}>
          {stock || 0}
        </Tag>
      ),
    },
    {
      title: "Total Value",
      key: "value",
      width: 130,
      render: (_, record) => (
        <span style={{ fontWeight: "600" }}>
          ${((record.price || 0) * (record.stock || 0)).toFixed(2)}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      fixed: "right",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Product"
            description="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button danger icon={<DeleteOutlined />} size="small">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h2
          style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            color: "#1f2937",
            margin: 0,
          }}
        >
          Products Management
        </h2>
        <p style={{ color: "#6b7280", fontSize: "1rem", marginTop: "0.25rem" }}>
          Manage your product inventory, pricing, and stock levels
        </p>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: "1.5rem" }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Products"
              value={totalProducts}
              prefix={<ShoppingOutlined />}
              valueStyle={{ color: "#3b82f6" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Inventory Value"
              value={totalValue}
              precision={2}
              prefix={<DollarOutlined />}
              valueStyle={{ color: "#10b981" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Low Stock Items"
              value={lowStock}
              valueStyle={{ color: lowStock > 0 ? "#ef4444" : "#10b981" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Average Price"
              value={avgPrice}
              precision={2}
              prefix="$"
              valueStyle={{ color: "#8b5cf6" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content Card */}
      <Card>
        {/* Toolbar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <Input
            placeholder="Search products by name, SKU, or description..."
            prefix={<SearchOutlined />}
            style={{ maxWidth: "400px" }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            size="large"
          >
            Add New Product
          </Button>
        </div>

        {/* Products Table */}
        <Table
          columns={columns}
          dataSource={filteredProducts}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} products`,
            pageSizeOptions: ["10", "20", "50", "100"],
          }}
          scroll={{ x: 1200 }}
          bordered
        />
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        title={editingProduct ? "Edit Product" : "Add New Product"}
        open={modalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Product Name"
            name="name"
            rules={[
              { required: true, message: "Please enter product name" },
              { min: 2, message: "Name must be at least 2 characters" },
            ]}
          >
            <Input placeholder="Enter product name" size="large" />
          </Form.Item>

          <Form.Item
            label="SKU (Stock Keeping Unit)"
            name="sku"
            rules={[
              { required: true, message: "Please enter SKU" },
              {
                pattern: /^[A-Z0-9-]+$/i,
                message: "SKU can only contain letters, numbers, and hyphens",
              },
            ]}
          >
            <Input placeholder="e.g., PROD-001" size="large" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea
              placeholder="Enter product description"
              rows={4}
              showCount
              maxLength={500}
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Price ($)"
                name="price"
                rules={[
                  { required: true, message: "Please enter price" },
                  {
                    type: "number",
                    min: 0.01,
                    message: "Price must be greater than 0",
                  },
                ]}
              >
                <InputNumber
                  placeholder="0.00"
                  style={{ width: "100%" }}
                  size="large"
                  precision={2}
                  min={0.01}
                  step={0.01}
                  prefix="$"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Stock Quantity"
                name="stock"
                rules={[
                  { required: true, message: "Please enter stock quantity" },
                  {
                    type: "number",
                    min: 0,
                    message: "Stock cannot be negative",
                  },
                ]}
              >
                <InputNumber
                  placeholder="0"
                  style={{ width: "100%" }}
                  size="large"
                  min={0}
                  step={1}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ marginBottom: 0, marginTop: "1.5rem" }}>
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button onClick={handleCancel} size="large">
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" size="large">
                {editingProduct ? "Update Product" : "Create Product"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
