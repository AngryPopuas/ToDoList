import { Button } from 'antd'
import { useAppDispatch } from '../hooks/redux'
import { storeRemoveTasks, storeSetDoneTasks, storeSelectTask, storeAddSubTask, storeSetOpenTask } from '../store/slices/tasksSlice'
import { ITask } from '../types'
import { storeSetModalState } from '../store/slices/modalSlice'

const TaskBtns = ({ task }: { task: ITask }) => {
    const dispatch = useAppDispatch()
    const handleEditTask = () => { dispatch(storeSetModalState({ task })) }
    const handleRemoveTask = () => { dispatch(storeRemoveTasks({ id: task.id })) }
    const handleSetDoneTask = () => { dispatch(storeSetDoneTasks({ id: task.id })) }
    const handleAddSubTask = () => {
        if (!task.isDone) {
            dispatch(storeAddSubTask({ id: task.id, task: task }))
        }
    }
    return (
        <div className="flex flex-row justify-between space-x-2 z-10">
            <Button onClick={handleSetDoneTask}>Готово</Button>
            <Button onClick={handleAddSubTask}>Добавить подзадачу</Button>
            <Button onClick={handleEditTask}>Редактировать</Button>
            <Button onClick={handleRemoveTask} className="flex flex-row items-center" danger>Удалить</Button>
        </div>
    )
}

export default TaskBtns