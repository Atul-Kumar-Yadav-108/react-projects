import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
export function Todoapp() {
  let [tasks, setTasks] = useState([
    { id: uuidv4(), task: "sample", isDone: false },
  ]);
  let [task, setTask] = useState("");
  const handleChange = (event) => {
    // console.log(event.target.value);
    setTask(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("submitted");
    if (task)
      setTasks((oldtasks) => [
        ...oldtasks,
        { id: uuidv4(), task: task, isDone: false },
      ]);
    setTask("");
  };
  const handleRemove = (id) => {
    // console.log("submitted");
    // if(task)
    //     setTasks((oldtasks)=>[...oldtasks, {id : uuidv4() ,task : task,isDone:true}])
    // setTask("")
    console.log(id);
    setTasks(
      tasks.filter((task) => {
        if (task.id != id) {
          return task;
        }
      })
    );
  };
  const handleMarksAsRead = (id) => {
    // console.log("submitted");
    // if(task)
    //     setTasks((oldtasks)=>[...oldtasks, {id : uuidv4() ,task : task,isDone:true}])
    // setTask("")
    // console.log(id);
    setTasks(
      tasks.map((task) => {
        if (task.id == id) {
          return { ...task, isDone: !task.isDone };
        } else {
          return task;
        }
      })
    );
    // console.log(tasks);
  };
  return (
    <>
      <div className="todoapp">
        <h2>Todo List</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="taskname"
              name="taskname"
              placeholder="Enter Task!"
              onChange={handleChange}
              value={task}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>

        <div className="tasklist">
          <table className="table text-light">
            <thead>
              <tr>
                <th>Sno</th>
                <th>Task</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task,idx) => {
                return (
                  <tr
                    key={task.id}
                    className={`mb-3 ${
                      task.isDone && "text-decoration-line-through"
                    }`}
                  >
                    <td>{idx+1}</td>
                    <td>{task.task}</td>
                    <td>
                      <button
                        className="btn btn-danger me-3"
                        onClick={() => handleRemove(task.id)}
                      >
                        Remove
                      </button>
                      <button
                        className="btn btn-info"
                        onClick={() => handleMarksAsRead(task.id)}
                      >
                        Mark as read
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
