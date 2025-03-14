// src/components/Task1/Task1.js
import React, { useState } from "react";
import { Button, Modal } from "antd";
import UserForm from "./UserForm/UserForm"; // Updated UserForm
import MobileNumberForm from "./MobileNumberForm/MobileNumberForm";
import OTPVerification from "./OTPVerification/OTPVerification";
import "./Task1.css"; // Import CSS for styling

const Task1 = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState(null); // Store user data from UserForm
  const [generatedOTP, setGeneratedOTP] = useState(""); // Store generated OTP
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

  const handleUserFormSubmit = (values) => {
    console.log("User Data:", values);
    setUserData(values); // Save user data
    setStep(2); // Move to the next step
  };

  const handleMobileFormSubmit = (otp) => {
    setGeneratedOTP(otp); // Save generated OTP
    setStep(3); // Move to OTP verification
  };

  const handleOTPVerification = () => {
    setIsModalVisible(true); // Show the modal
  };

  const handleModalOk = () => {
    setIsModalVisible(false); // Hide the modal
    // You can add logic to proceed to the next task or reset the form
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1); // Move to the previous step
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1); // Move to the next step
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <UserForm nextStep={handleUserFormSubmit} />;
      case 2:
        return <MobileNumberForm onNext={handleMobileFormSubmit} />;
      case 3:
        return (
          <OTPVerification
            onComplete={handleOTPVerification} // Pass the modal trigger function
            generatedOTP={generatedOTP}
          />
        );
      default:
        return <div>Invalid Step</div>;
    }
  };

  return (
    <div className="task1-container">
      {/* Render Current Step */}
      <div className="task1-content">{renderStep()}</div>

      {/* Navigation Buttons */}
      <div className="task1-navigation">
        <Button
          disabled={step === 1}
          onClick={handlePrevious}
          className="task1-navigation-button"
        >
          Previous
        </Button>
        <Button
          disabled={step === 3}
          onClick={handleNext}
          className="task1-navigation-button"
          style={{ marginLeft: 10 }}
        >
          Next
        </Button>
      </div>

      {/* Modal to display OTP verification success */}
      <Modal
        title="OTP Verification"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
      >
        <p>OTP Verified! Task 1 Complete</p>
      </Modal>
    </div>
  );
};

export default Task1;