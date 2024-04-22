import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IStoreModal, IStoreTasks, ITask } from '../../types'
import { deleteAllSelectedTasks, recursionCompleteToggler, recursionFilter, setDoneAllSelectedTasks, setEditTask, setTaskOpen, subTaskAdding, subtaskSelectAll } from '../../utils'
import { CreateTaskTitle } from '../../utils'



const initialState: IStoreModal = {
    isOpen: false,
    task: null,
}

export const modalSlice = createSlice({
    name: 'modalSlice',
    initialState,
    reducers: {
        storeSetModalState: (state,actions: PayloadAction<{task:ITask}>) => {
            state.isOpen = !state.isOpen
            state.task = actions.payload.task
        }
    },
})


export const {
    storeSetModalState
} = modalSlice.actions

export default modalSlice.reducer