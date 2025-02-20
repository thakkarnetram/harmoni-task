import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {tasks: []};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id'>>) => {
      state.tasks.push({
        ...action.payload,
        id: Date.now().toString(),
        completed: false,
      });
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleTaskCompletion: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
});

export const {addTask, editTask, deleteTask, toggleTaskCompletion} =
  taskSlice.actions;
export default taskSlice.reducer;
