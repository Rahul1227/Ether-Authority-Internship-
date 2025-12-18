import { useState } from "react";

function InputForm() {
  const [task, setTask] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState("");

  // handling form submit
  const submitForm = () => {
    if (task.trim() === "") {
      setError("Task cannot be empty");
      return;
    }

    if (task.length < 3) {
      setError("Task must be at least 3 characters");
      return;
    }

    setSubmitted(task);
    setTask("");
    setError("");
  };

  return (
    <div className="page">
      <h3>Input Form</h3>

      <input
        type="text"
        value={task}
        placeholder="Enter task"
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={submitForm}>Submit</button>

      {error && <p className="error">{error}</p>}

      {submitted && (
        <p className="success">
          Submitted Task: <b>{submitted}</b>
        </p>
      )}
    </div>
  );
}

export default InputForm;
