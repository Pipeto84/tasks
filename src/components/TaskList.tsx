import { deleteTask, TaskState } from "../features/tasks/taskSlice";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import "../styles/TaskList.css"

export const TaskList = () => {
  const tasks = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();
  const handleDelete = (task: TaskState) => {
    dispatch(deleteTask(task));
  };
  return (
    <div className="w-4/6 ">
      <h1 className="text-5xl text-center m-3 font-bold text-gray-200">Tasks: {tasks.length}</h1>
      <header className="flex justify-end items-center py-4">
        <Link
          to="/create-task"
          className="bg-indigo-600 px-2 py-1 rounded-sm text-sm shadow-md shadow-indigo-500 newTask"
        >
          Create Task
        </Link>
      </header>
      <div className="taskList ">
        {tasks.map((task) => (
          <div key={task.id} className="bg-neutral-800 p-4 rounded-md card">
            <header className="flex justify-between">
              <h3 className="font-bold">{task.title}</h3>
              <div className="flex gap-x-2">
                <Link
                  to={`/edit-task/${task.id}`}
                  className="bg-zinc-600 px-2 py-1 text-xs rounded-md"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(task)}
                  className="bg-red-500 px-2 py-1 text-xs rounded-md cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </header>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
