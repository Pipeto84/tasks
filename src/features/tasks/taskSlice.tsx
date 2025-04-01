import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface TaskState {
  id?: string;
  title: string;
  description: string;
}

const initialState: TaskState[] = [
  {
    id: "1",
    title: "Task 1",
    description: "Task one description",
  },
  {
    id: "2",
    title: "Task 2",
    description: "Task two description",
  },
];

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskState>) => {
      state.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<TaskState>) => {
      const taskFound = state.find((task) => task.id === action.payload.id);
      if (taskFound) {
        state.splice(state.indexOf(taskFound), 1);
      }
    },
    editTask: (state, action: PayloadAction<TaskState>) => {
      const { id, title, description } = action.payload;

      const foundTask = state.find((task) => task.id === id);
      if (foundTask) {
        foundTask.title = title;
        foundTask.description = description;
      }
    },
  },
});

export const { addTask, deleteTask, editTask } = taskSlice.actions;

export const selectTask = (state: RootState) => state.tasks;

export default taskSlice.reducer;
