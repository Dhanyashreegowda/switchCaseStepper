// src/components/Task1/MobileNumberForm.js
import React, { useState } from "react";
import { Button, Input, Form, message, Modal } from "antd";
import "./MobileNumberForm.css"; // Import CSS for styling

const MobileNumberForm = ({ onNext }) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
  const [otp, setOtp] = useState(""); // State to store the generated OTP

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a random 6-digit OTP
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const { mobile } = values;
        if (mobile.length === 10) {
          const otp = generateOTP(); // Generate OTP
          setOtp(otp); // Store the OTP in state
          setIsModalVisible(true); // Show the modal
          // Do NOT call onNext here! Wait for the user to acknowledge the modal.
        } else {
          message.error("Please enter a valid 10-digit mobile number!");
        }
      })
      .catch((error) => {
        console.log("Validation failed:", error);
      });
  };

  const handleModalOk = () => {
    setIsModalVisible(false); // Hide the modal
    onNext(otp); // Call onNext after the user acknowledges the modal
  };

  const handleModalCancel = () => {
    setIsModalVisible(false); // Hide the modal without calling onNext
  };

  return (
    <div className="mobile-number-form-container">
      <h2 className="mobile-number-form-title">Mobile Verification</h2>
      <Form form={form} layout="vertical">
        <Form.Item
          name="mobile"
          label="Mobile Number"
          rules={[
            {
              required: true,
              message: "Please enter your mobile number!",
            },
            {
              pattern: /^[0-9]{10}$/,
              message: "Mobile number must be 10 digits!",
            },
          ]}
        >
          <Input
            placeholder="Enter mobile number"
            className="mobile-number-input"
            maxLength={10}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={handleSubmit}
            className="mobile-number-button"
            block
          >
            Generate OTP
          </Button>
        </Form.Item>
      </Form>

      {/* Modal to display OTP */}
      <Modal
        title="OTP Generated"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <p>Your OTP is: <strong>{otp}</strong></p>
      </Modal>
    </div>
  );
};

export default MobileNumberForm;