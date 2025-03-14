// src/components/Task4/TodoApp.js
import React, { useState } from "react";
import { Button, Input, List, Card } from "antd";
import TodoSuccess from "./TodoSuccess";
import "./TodoApp.css"; // Import CSS for styling

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAdd = () => {
    if (input) {
      if (editIndex !== null) {
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = input;
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        setTodos([...todos, input]);
      }
      setInput("");
    }
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleEdit = (index) => {
    setInput(todos[index]);
    setEditIndex(index);
  };

  const handleFinal = () => {
    setShowSuccess(true);
  };

  const handleReset = () => {
    setTodos([]); // Clear the todo list
    setInput(""); // Clear the input field
    setEditIndex(null); // Reset edit mode
  };

  return (
    <div className="todo-app-container">
      <Card className="todo-app-card" style={{ width: todos.length > 5 ? "800px" : "400px" }}>
        <h2 className="todo-app-title">Todo List</h2>
        <div className="todo-app-input-container">
          <Input
            placeholder="Enter a task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="todo-app-input"
          />
          <Button
            type="primary"
            onClick={handleAdd}
            className="todo-app-add-button"
          >
            {editIndex !== null ? "Update" : "Add"}
          </Button>
        </div>
        <div className="todo-app-list-container">
          <List
            dataSource={todos}
            renderItem={(item, index) => (
              <List.Item className="todo-app-list-item">
                <span className="todo-app-task">{item}</span>
                <div className="todo-app-actions">
                  <Button
                    type="default"
                    onClick={() => handleEdit(index)}
                    className="todo-app-edit-button"
                  >
                    Edit
                  </Button>
                  <Button
                    type="danger"
                    onClick={() => handleDelete(index)}
                    className="todo-app-delete-button"
                  >
                    Delete
                  </Button>
                </div>
              </List.Item>
            )}
            className="todo-app-list"
          />
        </div>
        <div className="todo-app-footer">
          <Button
            type="primary"
            onClick={handleFinal}
            className="todo-app-final-button"
          >
            Final
          </Button>
          <Button
            type="default"
            onClick={handleReset}
            className="todo-app-reset-button"
          >
            Reset
          </Button>
        </div>
      </Card>
      {showSuccess && <TodoSuccess />}
    </div>
  );
};

export default TodoApp;