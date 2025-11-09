import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Tag,
  Space,
  message,
  Popconfirm,
  Card,
  Row,
  Col,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { clientsAPI } from "../../api/endpoints";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [form] = Form.useForm();
  const [search, setSearch] = useState("");

  const fetchClients = async () => {
    setLoading(true);
    try {
      const data = await clientsAPI.getAll({ search });
      setClients(data?.data || data);
    } catch (error) {
      message.error("Failed to fetch clients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(fetchClients, 500);
    return () => clearTimeout(delay);
  }, [search]);

  const handleSubmit = async (values) => {
    try {
      if (editingClient) {
        await clientsAPI.update(editingClient.id, values);
        message.success("Client updated successfully");
      } else {
        await clientsAPI.create(values);
        message.success("Client created successfully");
      }
      setOpenModal(false);
      form.resetFields();
      setEditingClient(null);
      fetchClients();
    } catch {
      message.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      await clientsAPI.delete(id);
      message.success("Client deleted successfully");
      fetchClients();
    } catch {
      message.error("Failed to delete client");
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", sorter: (a, b) => a.name.localeCompare(b.name) },
    { title: "Email", dataIndex: "email" },
    { title: "Address", dataIndex: "address" },
    { title: "Contact", dataIndex: "contact" },
    {
      title: "Status",
      dataIndex: "is_active",
      render: (val) => (
        <Tag color={val ? "green" : "red"}>{val ? "Active" : "Inactive"}</Tag>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            type="link"
            onClick={() => {
              setEditingClient(record);
              form.setFieldsValue(record);
              setOpenModal(true);
            }}
          />
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button icon={<DeleteOutlined />} danger type="link" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2 className="page-title">Clients</h2>

      {/* STATS */}
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={6}>
          <Card>
            <strong>Total Clients:</strong> {clients.length}
          </Card>
        </Col>
      </Row>

      {/* ACTIONS */}
      <Space style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Search clients..."
          enterButton
          allowClear
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 300 }}
        />

        <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpenModal(true)}>
          Add Client
        </Button>
      </Space>

      {/* TABLE */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={clients}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      {/* ADD/EDIT MODAL */}
      <Modal
        title={editingClient ? "Edit Client" : "Add Client"}
        open={openModal}
        onCancel={() => {
          setOpenModal(false);
          form.resetFields();
          setEditingClient(null);
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Client Name" rules={[{ required: true }]}>
            <Input placeholder="Client Name" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input.TextArea rows={3} placeholder="Address" />
          </Form.Item>
          <Form.Item name="contact" label="Contact">
            <Input placeholder="Contact No." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Clients;
