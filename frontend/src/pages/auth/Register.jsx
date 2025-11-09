// src/pages/auth/Register.jsx
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Input,
  Button,
  Typography,
  message,
  Checkbox,
  Card,
  Divider,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { registerUser, clearError } from "../../redux/slices/authSlice";
import "./Register.css"; // Custom CSS

const { Title, Text } = Typography;

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const [form] = Form.useForm();

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const onFinish = async (values) => {
    try {
      const { confirmPassword, ...userData } = values;
      const result = await dispatch(registerUser(userData)).unwrap();
      message.success("Registration successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="register-page">
      <Card className="register-card">
        {/* Logo & Header */}
        <div className="register-header">
          <div className="register-logo">
            <UserOutlined />
          </div>
          <Title level={2}>Create Account</Title>
          <Text type="secondary">Join us and start managing your clients</Text>
        </div>

        {/* Registration Form */}
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
          size="large"
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="Full Name"
            rules={[
              { required: true, message: "Please input your full name!" },
              { min: 2, message: "Name must be at least 2 characters!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your full name"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                pattern: /^[0-9+\-\s()]+$/,
                message: "Please enter a valid phone number!",
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Enter your phone number (optional)"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Create a strong password"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value)
                    return Promise.resolve();
                  return Promise.reject(
                    new Error("The passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm your password"
            />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("Please accept the terms and conditions")
                      ),
              },
            ]}
          >
            <Checkbox>
              I agree to the <Link to="/terms">Terms and Conditions</Link>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              className="register-btn"
            >
              Create Account
            </Button>
          </Form.Item>
        </Form>

        <Divider>Already have an account?</Divider>

        <div className="register-footer">
          <Text type="secondary">
            <Link to="/login">Sign In Instead</Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Register;
