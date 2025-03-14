// src/components/Task4/TodoSuccess.js
import React from "react";
import { Modal } from "antd";

const TodoSuccess = () => {
  return (
    <Modal title="Success" visible={true} footer={null}>
      <p>Todo List Submitted Successfully!</p>
    </Modal>
  );
};

export default TodoSuccess;