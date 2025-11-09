// src/pages/orders/OrderPayments.jsx
import { Row, Col, Select, InputNumber, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";

const { Option } = Select;

/**
 * props:
 *  - payments: array of { id, payment_mode, amount }
 *  - onChange(payments)
 */
const OrderPayments = ({ payments = [], onChange }) => {
  const addPayment = () => {
    const id = Date.now();
    onChange([...payments, { id, payment_mode: "Cash", amount: 0 }]);
  };

  const updatePayment = (id, patch) => {
    onChange(payments.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };

  const removePayment = (id) => {
    onChange(payments.filter((p) => p.id !== id));
  };

  return (
    <div>
      {payments.map((p) => (
        <Row
          key={p.id}
          gutter={8}
          style={{ marginBottom: 8, alignItems: "center" }}
        >
          <Col flex="1">
            <Select
              value={p.payment_mode}
              onChange={(val) => updatePayment(p.id, { payment_mode: val })}
              style={{ width: "100%" }}
            >
              <Option value="Cash">Cash</Option>
              <Option value="Card">Card</Option>
              <Option value="UPI">UPI</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Col>
          <Col flex="0 0 160px">
            <InputNumber
              min={0}
              value={p.amount}
              onChange={(val) => updatePayment(p.id, { amount: val })}
              style={{ width: "100%" }}
            />
          </Col>
          <Col flex="0 0 40px">
            <Button
              danger
              icon={<MinusCircleOutlined />}
              onClick={() => removePayment(p.id)}
            />
          </Col>
        </Row>
      ))}

      <Space style={{ width: "100%" }}>
        <Button
          type="dashed"
          block
          icon={<PlusOutlined />}
          onClick={addPayment}
        >
          Add payment line
        </Button>
      </Space>
    </div>
  );
};

export default OrderPayments;
