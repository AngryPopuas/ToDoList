import { configureStore } from "@reduxjs/toolkit"
import todoSlice from "./slices/tasksSlice"
import modalSlice from "./slices/modalSlice"

export const store = configureStore({
  reducer: {
    todos: todoSlice,
    modals: modalSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch