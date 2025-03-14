import React, { useState, useRef } from "react";
import { Button, Form, Modal, Input } from "antd";
import "./OTPVerification.css"; // Import CSS for styling

const OTPVerification = ({ onComplete, generatedOTP }) => {
  const [otpValues, setOtpValues] = useState(Array(6).fill("")); // Array to store OTP digits
  const [retryCount, setRetryCount] = useState(0); // Track retry attempts
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
  const [modalMessage, setModalMessage] = useState(""); // State to store modal message
  const inputRefs = useRef([]); // Refs for each input box

  // Handle input change for individual OTP boxes
  const handleInputChange = (index, value) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;

    // Auto-focus the next input if a digit is entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    setOtpValues(newOtpValues);
  };

  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, ""); // Remove non-digits
    if (pasteData.length === 6) {
      const newOtpValues = pasteData.split("");
      setOtpValues(newOtpValues);

      // Focus the last input box after pasting
      inputRefs.current[5].focus();
    }
  };

  // Handle OTP verification
  const handleSubmit = () => {
    const otp = otpValues.join("");
    if (otp === generatedOTP) {
      setModalMessage("OTP Verified!"); // Set success message
      setIsModalVisible(true); // Show the modal
      onComplete(); // Call the onComplete function passed from the parent
    } else {
      setRetryCount((prevRetryCount) => {
        const newRetryCount = prevRetryCount + 1;
        if (newRetryCount < 3) {
          setModalMessage(`Invalid OTP, try again. Attempts left: ${2 - prevRetryCount}`); // Set error message
        } else {
          setModalMessage("Maximum attempts reached. Please restart the process."); // Set error message
          setOtpValues(Array(6).fill("")); // Clear the OTP input boxes
        }
        setIsModalVisible(true); // Show the modal
        return newRetryCount;
      });
    }
  };

  const handleModalOk = () => {
    setIsModalVisible(false); // Hide the modal
  };

  return (
    <div className="otp-verification-container">
      <h2 className="otp-verification-title">OTP Verification</h2>
      <Form layout="vertical">
        <Form.Item
          label="OTP"
          rules={[
            {
              required: true,
              message: "Please enter the OTP!",
            },
            {
              pattern: /^[0-9]{6}$/,
              message: "OTP must be 6 digits!",
            },
          ]}
        >
          <div className="otp-input-container">
            {otpValues.map((value, index) => (
              <Input
                key={index}
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onPaste={handlePaste}
                maxLength={1}
                className="otp-input-box"
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </div>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={handleSubmit}
            className="otp-verify-button"
            block
          >
            Verify OTP
          </Button>
        </Form.Item>
      </Form>

      {/* Modal to display messages */}
      <Modal
        title="OTP Verification"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
      >
        <p>{modalMessage}</p>
      </Modal>
    </div>
  );
};

export default OTPVerification;