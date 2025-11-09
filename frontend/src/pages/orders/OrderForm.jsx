// src/pages/orders/OrderForm.jsx
import { useEffect, useState, useMemo } from "react";
import {
  Modal,
  Form,
  Select,
  Row,
  Col,
  InputNumber,
  Input,
  Button,
  Table,
  Space,
  Typography,
  message,
  Divider,
  Empty,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { clientsAPI, productsAPI, ordersAPI } from "../../api/endpoints";
import { useSelector } from "react-redux";
import OrderPayments from "./OrderPayments";

const { Text } = Typography;
const { Option } = Select;

const OrderForm = ({ visible, onClose, onCreated }) => {
  const [form] = Form.useForm();
  const { user } = useSelector((s) => s.auth || {});

  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingClients, setLoadingClients] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // in-form items & payments
  const [items, setItems] = useState([]);
  const [payments, setPayments] = useState([]);

  // product selection helpers
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedQty, setSelectedQty] = useState(1);

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!visible) {
      form.resetFields();
      setItems([]);
      setPayments([]);
      setSelectedProductId(null);
      setSelectedQty(1);
      return;
    }
    fetchClients();
    fetchProducts();
  }, [visible]);

  const fetchClients = async () => {
    setLoadingClients(true);
    try {
      const res = await clientsAPI.getAll();
      setClients(Array.isArray(res) ? res : res?.data || []);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch clients");
    } finally {
      setLoadingClients(false);
    }
  };

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await productsAPI.getAll();
      setProducts(Array.isArray(res) ? res : res?.data || []);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch products");
    } finally {
      setLoadingProducts(false);
    }
  };

  const findProduct = (id) => products.find((p) => Number(p.id) === Number(id));

  const handleAddProduct = () => {
    if (!selectedProductId) return message.warning("Select a product");
    const product = findProduct(selectedProductId);
    if (!product) return message.error("Product not found");
    if (!selectedQty || selectedQty <= 0)
      return message.warning("Quantity must be at least 1");
    if (typeof product.stock === "number" && selectedQty > product.stock)
      return message.warning(`Only ${product.stock} units available`);

    // unique product per order (specification: product must be unique -> edit qty instead of re-adding)
    if (items.some((i) => Number(i.product_id) === Number(product.id)))
      return message.warning("Product already added. Edit quantity in table.");

    const newItem = {
      product_id: product.id,
      name: product.name,
      unit_price: Number(product.price || 0),
      quantity: Number(selectedQty),
      total_price: Number((product.price || 0) * selectedQty),
      stock: product.stock ?? null,
    };

    setItems((s) => [...s, newItem]);
    setSelectedProductId(null);
    setSelectedQty(1);
  };

  const handleUpdateQuantity = (product_id, qty) => {
    if (!qty || qty <= 0) return;
    setItems((cur) =>
      cur.map((it) =>
        Number(it.product_id) === Number(product_id)
          ? {
              ...it,
              quantity: qty,
              total_price: Number((it.unit_price || 0) * qty),
            }
          : it
      )
    );
  };

  const handleRemoveItem = (product_id) => {
    setItems((s) =>
      s.filter((it) => Number(it.product_id) !== Number(product_id))
    );
  };

  // totals
  const itemsTotal = useMemo(
    () => items.reduce((acc, it) => acc + Number(it.total_price || 0), 0),
    [items]
  );

  const paymentsTotal = useMemo(
    () => payments.reduce((acc, p) => acc + Number(p.amount || 0), 0),
    [payments]
  );

  const remaining = Number((itemsTotal || 0) - (paymentsTotal || 0));

  const itemsColumns = [
    { title: "Product", dataIndex: "name", key: "name" },
    {
      title: "Unit Price",
      dataIndex: "unit_price",
      key: "unit_price",
      width: 120,
      render: (v) => `$${Number(v || 0).toFixed(2)}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 140,
      render: (q, record) => (
        <InputNumber
          min={1}
          max={record.stock ?? Infinity}
          value={q}
          onChange={(val) => {
            if (!val || val <= 0) return;
            if (record.stock != null && val > record.stock) {
              message.warning(`Only ${record.stock} available`);
              return;
            }
            handleUpdateQuantity(record.product_id, val);
          }}
        />
      ),
    },
    {
      title: "Total",
      dataIndex: "total_price",
      key: "total_price",
      width: 140,
      render: (v) => `$${Number(v || 0).toFixed(2)}`,
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleRemoveItem(record.product_id)}
          />
        </Space>
      ),
    },
  ];

  const validateBeforeSubmit = (values) => {
    if (!values.client_id) {
      message.warning("Please select a client.");
      return false;
    }
    if (!items || items.length === 0) {
      message.warning("Add at least one product to the order.");
      return false;
    }
    if (paymentsTotal > itemsTotal) {
      message.warning("Payments total cannot exceed items total.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (values) => {
    if (!validateBeforeSubmit(values)) return;

    const payload = {
      client_id: values.client_id,
      products: items.map((it) => ({
        product_id: it.product_id,
        quantity: it.quantity,
      })),
      comment: values.comment || "",
      payments: payments.map((p) => ({
        payment_mode: p.payment_mode,
        amount: Number(p.amount),
      })),
      created_by: user?.id || user?.user_id || undefined,
    };

    setSubmitting(true);
    try {
      await ordersAPI.create(payload);
      onCreated && onCreated();
      form.resetFields();
      setItems([]);
      setPayments([]);
    } catch (err) {
      console.error(err);
      message.error(err?.message || "Failed to create order");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      title="Create Order"
      open={visible}
      onCancel={() => {
        onClose && onClose();
        form.resetFields();
        setItems([]);
        setPayments([]);
      }}
      destroyOnClose
      width={1000}
      okText="Submit Order"
      onOk={() => form.submit()}
      confirmLoading={submitting}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="client_id"
              label="Client"
              rules={[{ required: true, message: "Please select client" }]}
            >
              <Select
                showSearch
                placeholder="Select client"
                loading={loadingClients}
                filterOption={(input, option) =>
                  (option?.children || "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {clients.map((c) => (
                  <Option key={c.id} value={c.id}>
                    {c.name} — {c.email || ""}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="Add product">
              <Row gutter={8}>
                <Col flex="1 1 60%">
                  <Select
                    value={selectedProductId}
                    onChange={(v) => setSelectedProductId(v)}
                    showSearch
                    placeholder="Select product"
                    loading={loadingProducts}
                    filterOption={(input, option) =>
                      (option?.children || "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    style={{ width: "100%" }}
                  >
                    {products.map((p) => (
                      <Option key={p.id} value={p.id}>
                        {p.name} — ${Number(p.price || 0).toFixed(2)}{" "}
                        {typeof p.stock === "number"
                          ? `(stock: ${p.stock})`
                          : ""}
                      </Option>
                    ))}
                  </Select>
                </Col>

                <Col flex="0 0 120px">
                  <InputNumber
                    min={1}
                    value={selectedQty}
                    onChange={(v) => setSelectedQty(v)}
                    style={{ width: "100%" }}
                  />
                </Col>

                <Col flex="0 0 110px">
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    style={{ width: "100%" }}
                    onClick={handleAddProduct}
                  >
                    Add
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            {items.length === 0 ? (
              <Empty description="No products added" />
            ) : (
              <Table
                dataSource={items}
                columns={itemsColumns}
                size="small"
                pagination={false}
                rowKey={(r) => r.product_id}
                scroll={{ x: 800 }}
              />
            )}
          </Col>
        </Row>

        <Divider />

        <Row gutter={16}>
          <Col xs={24} md={14}>
            <OrderPayments payments={payments} onChange={setPayments} />
            <Form.Item name="comment" label="Order Comment (optional)">
              <Input.TextArea
                rows={3}
                maxLength={500}
                placeholder="Optional comment for this order"
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={10} style={{ textAlign: "right" }}>
            <div>
              <Text type="secondary">Items Total</Text>
            </div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>
              ${Number(itemsTotal || 0).toFixed(2)}
            </div>

            <div style={{ marginTop: 12 }}>
              <Text type="secondary">Payments Total</Text>
            </div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>
              ${Number(paymentsTotal || 0).toFixed(2)}
            </div>

            <div style={{ marginTop: 12 }}>
              <Text type="secondary">Remaining</Text>
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: remaining < 0 ? "#ef4444" : "#111827",
              }}
            >
              ${Number(remaining || 0).toFixed(2)}
            </div>

            <div style={{ marginTop: 8 }}>
              <Text type="secondary">
                Note: payments total must not exceed items total.
              </Text>
            </div>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default OrderForm;
