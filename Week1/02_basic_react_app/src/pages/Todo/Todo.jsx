import { useState } from "react";

function Todo() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  // adding task
  const addTask = () => {
    if (task === "") return;

    setList([...list, { text: task, done: false }]);
    setTask("");
  };

  // toggling task status
  const toggleTask = (ind) => {
    const newList = [...list];
    newList[ind].done = !newList[ind].done;
    setList(newList);
  };

  // deleting task
  const deleteTask = (ind) => {
    const newList = list.filter((_, i) => i !== ind);
    setList(newList);
  };

  return (
    <div className="page">
      <h3>Todo App</h3>

      <div className="todo-input">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul className="todo-list">
        {list.map((t, i) => (
          <li key={i} className={t.done ? "done" : ""}>
            <span onClick={() => toggleTask(i)}>
              {t.text}
            </span>
            <button onClick={() => deleteTask(i)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
