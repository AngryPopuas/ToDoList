import { useEffect, useState } from 'react'
import { useAppSelector } from '../hooks/redux'
import TaskItem from './TaskItem'

const TaskList = () => {
    const storeTasks = useAppSelector(store => store.todos.tasks)
    return (
        <div className='flex flex-col justify-center items-center'>
            {storeTasks.length === 0
                ?
                <div className='grow flex justify-center items-center'>
                    <h1 className='text-[16px] tracking-tight font-light'>У вас нет ни одной задачи!</h1>
                </div>
                :
                storeTasks.map((item) => {
                    return (
                        <TaskItem key={item.id} isSubTask={false} task={item}></TaskItem>
                    )
                })
            }
        </div>
    )
}

export default TaskList