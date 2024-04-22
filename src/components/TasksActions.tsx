import { Button } from 'antd'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { storeRemoveAllTasks, storeRemoveSelectedTasks, storeSetDoneSelectedTasks } from '../store/slices/tasksSlice'

const TasksActions = () => {
    const tasks = useAppSelector(store => store.todos.tasks)
    const dispatch = useAppDispatch()
    const handleDeleteTasks = () => {
        dispatch(storeRemoveSelectedTasks())
    }
    const handleSetDoneTasks = () => {
        dispatch(storeSetDoneSelectedTasks())
    }
    const handleRemoveAllTasks = () => {
        dispatch(storeRemoveAllTasks())
    }
    return (
        <div className={`w-full flex flex-row justify-between items-center transition-all ${tasks.length === 0 && 'opacity-20'}`}>
            <Button onClick={handleDeleteTasks} danger>Удалить выбранные</Button>
            <Button onClick={handleRemoveAllTasks} danger>Удалить все</Button>
            <Button onClick={handleSetDoneTasks}>Отметить выбранные</Button>
        </div>
    )
}

export default TasksActions