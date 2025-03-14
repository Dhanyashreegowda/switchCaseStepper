import React, { useState } from "react";
import { Button, Modal } from "antd";
import UserForm from "./Task1/UserForm/UserForm"; // Import UserForm
import MobileNumberForm from "./Task1/MobileNumberForm/MobileNumberForm"; // Import MobileNumberForm
import OTPVerification from "./Task1/OTPVerification/OTPVerification"; // Import OTPVerification
import Task2 from "./Task2/FetchData"; // Updated path
import Task3 from "./Task3/Counter"; // Updated path
import Task4 from "./Task4/TodoApp"; // Updated path
import "./Stepper.css"; // Import CSS for styling

const Stepper = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState(null); // Store user data from UserForm
  const [generatedOTP, setGeneratedOTP] = useState(""); // Store generated OTP
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

  const handleUserFormSubmit = (values) => {
    console.log("User Data:", values);
    setUserData(values); // Save user data
    setStep(2); // Move to the next step (MobileNumberForm)
  };

  const handleMobileFormSubmit = (otp) => {
    setGeneratedOTP(otp); // Save generated OTP
    setStep(3); // Move to OTP verification
  };

  const handleOTPVerification = () => {
    setIsModalVisible(true); // Show the modal instead of using alert
  };

  const handleModalOk = () => {
    setIsModalVisible(false); // Hide the modal
    setStep(4); // Navigate to Task 2
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
            onComplete={handleOTPVerification}
            generatedOTP={generatedOTP}
          />
        );
      case 4:
        return <Task2 onDone={() => setStep(5)} />;
      
      case 5:
        return <Task3 onDone={() => setStep(6)} />;
      case 6:
        return <Task4 />;
      default:
        return <div>Invalid Step</div>;
    }
  };

  return (
    <div>
      {/* Fixed Header with Navigation Buttons */}
      <div className="stepper-header">
        <div className="stepper-header-buttons">
          <Button type={step === 1 ? "primary" : "default"} onClick={() => setStep(1)}>User Form</Button>
          <Button type={step === 2 ? "primary" : "default"} onClick={() => setStep(2)}>Mobile Number Form</Button>
          <Button type={step === 3 ? "primary" : "default"} onClick={() => setStep(3)}>OTP Verification</Button>
          <Button type={step === 4 ? "primary" : "default"} onClick={() => setStep(4)}>Task 2</Button>
          <Button type={step === 5 ? "primary" : "default"} onClick={() => setStep(5)}>Task 3</Button>
          <Button type={step === 6 ? "primary" : "default"} onClick={() => setStep(6)}>Task 4</Button>
        </div>
      </div>
  
      {/* Render Current Step */}
      <div className="stepper-content">{renderStep()}</div>
  
      {/* Modal to display OTP verification success */}
      <Modal title="OTP Verification" visible={isModalVisible} onOk={handleModalOk} onCancel={handleModalOk}>
        <p>OTP Verified! Task 1 Complete</p>
      </Modal>
    </div>
  );
  
};

export default Stepper;