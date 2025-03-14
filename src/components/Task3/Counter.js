import React, { useReducer } from "react";
import { Button, Card } from "antd";
import "./Counter.css"; // Import CSS for styling

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 }; // Reset the count to 0
    default:
      throw new Error();
  }
}

const Counter = ({ onDone }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="counter-container">
      <Button onClick={onDone} className="done-watching-button">
        Done Watching
      </Button>

      <Card className="counter-card">
        <h2 className="counter-title">Count: {state.count}</h2>
        <div className="counter-buttons">
          <Button
            type="primary"
            onClick={() => dispatch({ type: "increment" })}
            className="counter-button"
          >
            Increment
          </Button>
          <Button
            type="primary"
            onClick={() => dispatch({ type: "decrement" })}
            className="counter-button"
          >
            Decrement
          </Button>
          <Button
            type="default"
            onClick={() => dispatch({ type: "reset" })}
            className="counter-button reset-button"
          >
            Reset
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Counter;
