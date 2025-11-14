import { useState } from "react";
import "./index.css";
import edit from "./assets/pencil.svg";
import bin from "./assets/bin.svg";
import notask from "./assets/notask.svg";


function App() {
  type Task = {
    text: string;
    completed: boolean;
  };
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editTask, setEditTask] = useState<string>("");

  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const taskEditor = (index: number) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { text: editTask, completed: t.completed } : t
    );
    setTasks(updatedTasks);
    setEditIndex(null);
  };

  const toggleComplete = (index: number) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  };

  return (
    <>
      <header className="bg-black text-white font-bold mb-2 py-3 pl-4">
        <h2>ToDoList App</h2>
      </header>
      <main className="flex">
        <div className="flex-1">
          {tasks.length > 0 ? (
            <div className="m-auto mx-10 h-[80vh] overflow-auto">
              <ul>
                {tasks.map(
                  (task, index) =>
                    !task.completed && (
                      <li
                        key={index}
                        className="p-2 bg-amber-400  text-white flex items-center gap-3 rounded-xl mb-1"
                      >
                        {index !== editIndex ? (
                          <>
                            <span
                              className={
                                task.completed
                                  ? "line-through text-gray-500"
                                  : ""
                              }
                            >
                              {task.text}
                            </span>

                            <button
                              className="ml-auto cursor-pointer"
                              onClick={() => {
                                setEditIndex(index);
                                setEditTask(task.text);
                              }}
                            >
                              <img src={edit} className="h-6 w-6"></img>
                            </button>
                            <button
                              className="cursor-pointer"
                              onClick={() => deleteTask(index)}
                            >
                              <img src={bin} className="h-8 w-8"></img>
                            </button>
                          </>
                        ) : (
                          <>
                            <input
                              type="text"
                              value={editTask}
                              onChange={(e) => setEditTask(e.target.value)}
                            />
                            <button onClick={() => taskEditor(index)}>
                              Done
                            </button>
                          </>
                        )}
                        <button
                          className="cursor-pointer"
                          onClick={() => toggleComplete(index)}
                        >
                          {task.completed ? "Undo" : "Mark as completed"}
                        </button>
                      </li>
                    )
                )}
              </ul>
              {tasks.filter((t) => t.completed).length === 0 ? (
                ""
              ) : (
                <>
                  <p className="p-1 m-1 bg-black text-white w-min rounded-[10px]">
                    Completed
                  </p>
                  <ul>
                    {tasks.map(
                      (task, index) =>
                        task.completed && (
                          <li className="p-2 bg-cyan-500  text-white flex items-center gap-3 rounded-xl mb-1">
                            {task.text}
                            <button
                              className="cursor-pointer ml-auto"
                              onClick={() => deleteTask(index)}
                            >
                              <img src={bin} className="h-8 w-8"></img>
                            </button>
                            <button
                              className="cursor-pointer"
                              onClick={() => toggleComplete(index)}
                            >
                              {task.completed ? "Undo" : "Mark as completed"}
                            </button>
                          </li>
                        )
                    )}
                  </ul>
                </>
              )}
            </div>
          ) : (
            <div className="h-[80vh] flex flex-col items-center justify-center  opacity-[0.4]">
              <img
                className="w-50 h-50"
                alt="Nothing planned"
                src={notask}
              ></img>
              <p className="text-[18px]">Nothing Planned Yet</p>
            </div>
          )}
        </div>
      </main>

      <div className="absolute bottom-10 w-full flex justify-center px-10 items-center">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add your task..."
          className="border w-full text-[20px] bg-white"
        />
        <button
          className="bg-black text-white m-1 px-4 py-1 font-bold rounded-xl cursor-pointer"
          onClick={addTask}
        >
          +
        </button>
      </div>
    </>
  );
}

export default App;
