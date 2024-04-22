import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IStoreTasks, ITask } from '../../types'
import { deleteAllSelectedTasks, recursionCompleteToggler, recursionFilter, setDoneAllSelectedTasks, setEditTask, setTaskOpen, subTaskAdding, subtaskSelectAll } from '../../utils'
import { CreateTaskTitle } from '../../utils'



const initialState: IStoreTasks = {
    tasks: [
        {
            ...CreateTaskTitle('Первая задача')
        }
    ]
}

export const todoSlice = createSlice({
    name: 'todoSlice',
    initialState,
    reducers: {
        storeCreateTask: (state, action: PayloadAction<ITask>) => {
            state.tasks.push(action.payload)
        },
        storeAddSubTask: (state, action: PayloadAction<{ id: number, task: ITask }>) => {
            state.tasks = subTaskAdding(action.payload.id, state.tasks, CreateTaskTitle('Новая подзадача'));
        },
        storeRemoveTasks: (state, action: PayloadAction<{ id: number }>) => {
            state.tasks = recursionFilter(action.payload.id, state.tasks);
        },
        storeSelectTask: (state, action: PayloadAction<{ id: number }>) => {
            state.tasks = subtaskSelectAll(action.payload.id, state.tasks)
        },
        storeSetDoneTasks: (state, action: PayloadAction<{ id: number }>) => {
            state.tasks = recursionCompleteToggler(action.payload.id, state.tasks);
        },
        storeSetOpenTask: (state, action: PayloadAction<{ id: number }>) => {
            state.tasks = setTaskOpen(action.payload.id, state.tasks)
        },
        storeRemoveSelectedTasks: (state) => {
            state.tasks = deleteAllSelectedTasks(state.tasks)
        },
        storeSetDoneSelectedTasks: (state) => {
            state.tasks = setDoneAllSelectedTasks(state.tasks)
        },
        storeSetEditTask: (state, action: PayloadAction<{ task: ITask }>) => {
            state.tasks = setEditTask(state.tasks, action.payload.task)
        },
        storeRemoveAllTasks: (state) => {
            state.tasks = []
        }
    },
})


export const {
    storeCreateTask,
    storeAddSubTask,
    storeRemoveTasks,
    storeSelectTask,
    storeSetDoneTasks,
    storeSetOpenTask,
    storeRemoveSelectedTasks,
    storeSetDoneSelectedTasks,
    storeSetEditTask,
    storeRemoveAllTasks
} = todoSlice.actions

export default todoSlice.reducer