// src/components/Task1/UserForm.js
import React from "react";
import { Input, Button, Form, Card } from "antd";
import { Col, Row } from "antd";
import "./UserForm.css"; // Import CSS for styling

const UserForm = ({ nextStep }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("User Data:", values);
    nextStep(values); // Pass user data to the next step
  };

  return (
    <div className="user-form-container">
      <h2>User Details</h2>
      <Card className="out_box">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Card className="in_box">
            <Row gutter={[24, 24]}>
              {/* First Name */}
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item
                  label="First Name"
                  name="firstname"
                  rules={[
                    {
                      required: true,
                      validator: (_, value) => {
                        if (!value) {
                          return Promise.reject("Please enter your first name!");
                        }
                        if (value.length < 3 || value.length > 100) {
                          return Promise.reject("First name must be between 3 to 100 characters long!");
                        }
                        if (value.includes("  ")) {
                          return Promise.reject("Consecutive spaces are not allowed!");
                        }
                        if (!/^[A-Za-z\s]+$/.test(value)) {
                          return Promise.reject("Only letters and spaces are allowed!");
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input placeholder="Enter your first name" />
                </Form.Item>
              </Col>

              {/* Last Name */}
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item
                  label="Last Name"
                  name="lastname"
                  rules={[
                    {
                      required: true,
                      validator: (_, value) => {
                        if (!value) {
                          return Promise.reject("Please enter your last name!");
                        }
                        if (value.length < 3 || value.length > 100) {
                          return Promise.reject("Last name must be between 3 to 100 characters long!");
                        }
                        if (value.includes("  ")) {
                          return Promise.reject("Consecutive spaces are not allowed!");
                        }
                        if (!/^[A-Za-z\s]+$/.test(value)) {
                          return Promise.reject("Only letters and spaces are allowed!");
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input placeholder="Enter your last name" />
                </Form.Item>
              </Col>

              {/* Email */}
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      validator: (_, value) => {
                        if (!value) {
                          return Promise.reject("Please enter your email!");
                        }
                        if (value.length < 8 || value.length > 50) {
                          return Promise.reject("Email must be between 8 to 50 characters long!");
                        }
                        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                          return Promise.reject("Please enter a valid email address!");
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input placeholder="Enter your email" />
                </Form.Item>
              </Col>

              {/* Confirm Email */}
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item
                  label="Confirm Email"
                  name="confirmEmail"
                  dependencies={["email"]}
                  rules={[
                    { required: true, message: "Please confirm your email!" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("email") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("Emails do not match!"));
                      },
                    }),
                  ]}
                >
                  <Input placeholder="Confirm your email" />
                </Form.Item>
              </Col>

              {/* Password */}
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please enter your password!" },
                    { min: 6, message: "Password must be at least 6 characters long!" },
                  ]}
                >
                  <Input.Password placeholder="Enter your password" />
                </Form.Item>
              </Col>

              {/* Confirm Password */}
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    { required: true, message: "Please confirm your password!" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("Passwords do not match!"));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm your password" />
                </Form.Item>
              </Col>

              {/* Mobile Number */}
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item
                  label="Mobile Number"
                  name="mobile"
                  rules={[
                    { required: true, message: "Please enter your mobile number!" },
                    { pattern: /^[0-9]{10}$/, message: "Mobile number must be 10 digits!" },
                  ]}
                >
                  <Input placeholder="Enter your mobile number" maxLength={10} />
                </Form.Item>
              </Col>

              {/* Alternative Mobile Number */}
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item
                  label="Alternative Mobile Number"
                  name="altMobile"
                  rules={[
                    { pattern: /^[0-9]{10}$/, message: "Mobile number must be 10 digits!" },
                  ]}
                >
                  <Input placeholder="Enter alternative mobile number (optional)" maxLength={10} />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Button type="primary" htmlType="submit" block>
            Continue
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default UserForm;