import { Button, Input } from "antd"
import { useState } from "react"
import { useAppDispatch } from "../hooks/redux"
import { storeCreateTask } from "../store/slices/tasksSlice"
import { CreateTaskTitle } from "../utils"



const TaskCreate = () => {
    const dispatch = useAppDispatch()
    const [taskTitle, setTaskTitle] = useState('')
    const [errorTitle, setErrorTitle] = useState(false)

    const handleCreateTask = () => {
        if (!taskTitle) {
            setErrorTitle(true)
            setTimeout(() => { setErrorTitle(false) }, 3000)
            return
        }
        dispatch(storeCreateTask(CreateTaskTitle(taskTitle)))
        setTaskTitle('')
    }
    return (
        <div className='flex flex-col justify-between items-center'>
            <div className="flex flex-row justify-between items-center w-full">
                <Input placeholder="Название задачи" value={taskTitle} onChange={(e) => { setTaskTitle(e.target.value) }} />
                <Button type="primary" className="ml-5" onClick={handleCreateTask}>Добавить</Button>
            </div>
            {errorTitle && <span className="transition-all text-red-500 font-light self-start text-[16px]">Название задачи должно содержать хотя-бы один символ!</span>}
        </div>
    )
}

export default TaskCreate