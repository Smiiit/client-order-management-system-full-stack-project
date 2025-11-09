// src/pages/auth/Login.jsx
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  message,
  Card,
  Divider,
} from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { loginUser, clearError } from "../../redux/slices/authSlice";
import "./Login.css"; // Custom CSS file

const { Title, Text } = Typography;

const Login = () => {
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
      const result = await dispatch(loginUser(values)).unwrap();
      console.log("Login result:", result);
      message.success("Login successful!");
      setTimeout(() => navigate("/dashboard"), 100);
    } catch (err) {
      console.error("Login error:", err);
      message.error(err || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-page">
      <Card className="login-card">
        {/* Logo & Welcome */}
        <div className="login-header">
          <div className="login-logo">
            <UserOutlined />
          </div>
          <Title level={2}>Welcome Back</Title>
          <Text type="secondary">Sign in to your account</Text>
        </div>

        {/* Login Form */}
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
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
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
            />
          </Form.Item>

          <div className="login-options">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link to="/forgot-password" className="forgot-link">
              Forgot password?
            </Link>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="login-btn"
              block
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <Divider>New to our platform?</Divider>

        <div className="login-footer">
          <Text type="secondary">
            Don't have an account? <Link to="/register">Create Account</Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Login;
