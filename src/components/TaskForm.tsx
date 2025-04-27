import React, { useState, useEffect } from "react";
import { addTask, editTask, TaskState } from "../features/tasks/taskSlice";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";

export const TaskForm = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks);
  const navigate = useNavigate();
  const params = useParams();

  const [task, setTask] = useState<TaskState>({
    title: "",
    description: "",
  });
  const [canceled, setCanceled] = useState(false);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (params.id) {
      if (!canceled) {
        dispatch(editTask(task));
      }
    } else if (task.title.length !== 0) {
      dispatch(
        addTask({
          ...task,
          id: uuid(),
        })
      );
    }
    navigate("/");
  };
  useEffect(() => {
    if (params.id) {
      const taskFound = tasks.find((task) => task.id === params.id);
      if (taskFound) {
        setTask(taskFound);
      }
    }
  }, [params.id, tasks]);
  const handleCancel = () => {
    setCanceled(true)
  };
  const handleSave = () => {
    setCanceled(false)
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-800 max-w-sm p-4 rounded-xl shadow-lg"
    >
      <label htmlFor="title" className="block text-base font-bold mb-2">
        Task:
      </label>
      <input
        name="title"
        type="text"
        placeholder="Title..."
        onChange={handleChangeInput}
        value={task.title}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        autoComplete="off"
        autoFocus
      />
      <label htmlFor="description" className="block text-base font-bold mb-2">
        Description:
      </label>
      <textarea
        name="description"
        placeholder="Description..."
        onChange={handleChangeTextarea}
        value={task.description}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
      ></textarea>
      <div className="flex justify-between">
        <button
          className="bg-indigo-600 px-2 py-1 rounded-md disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
          disabled={task.title.length < 1}
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="bg-red-500 px-2 py-1 rounded-md cursor-pointer"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
