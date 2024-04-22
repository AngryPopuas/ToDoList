import { Button } from "antd"
import { ITask } from "../types"
import { useAppDispatch } from "../hooks/redux"
import { storeAddSubTask, storeRemoveTasks, storeSelectTask, storeSetDoneTasks, storeSetOpenTask } from "../store/slices/tasksSlice"
import TaskBtns from "./TaskBtns"


const TaskItem = ({ task, isSubTask }: { task: ITask, isSubTask: boolean }) => {
  const dispatch = useAppDispatch()
  const handleSelectTask = () => { dispatch(storeSelectTask({ id: task.id })) }
  const handleSetOpen = () => { dispatch(storeSetOpenTask({ id: task.id })) }


  return (
    <div className="flex flex-col w-full items-center">
      <div
        className={`
            ${task.isDone ? 'opacity-70' : 'opacity-100'}
            ${task.isOpen && 'min-h-[160px]'}
            ${isSubTask ? 'bg-[#1d1d1d] w-[95%] ' : 'bg-[#262626] border border-[#333333]'}
            flex flex-col justify-between w-full p-5 min-h-[72px] mt-2 rounded-[8px] cursor-pointer transition-all 
        `}
      >
        <div className="flex flex-row justify-between items-center">
          <button onClick={handleSelectTask}><div className={`w-4 h-4 rounded-full border border-[#4EA8DE] ${task.isSelected && 'bg-[#4EA8DE]'}`}></div></button>
          <div className="grow px-5"><h1 onClick={handleSetOpen} className={`font-light ${task.isDone ? 'line-through' : ''}`}>{task.title}</h1></div>
          <TaskBtns task={task} />
        </div>
        {task.isOpen &&
          <div className="flex flex-row justify-between items-end">
            <h1 className={`font-light ${task.isDone ? 'line-through' : ''}`}>{task.description}</h1>
            <div className="flex flex-row space-x-10">
              <h1 className={`font-light text-[#000000] text-center ${task.isDone ? 'line-through' : ''}`}>Создана:{task.time.created}</h1>
              <h1 className={`font-light text-[#000000] text-center ${task.isDone ? 'line-through' : ''}`}>Начинается:{task.time.starts?.slice(0,10)}</h1>
            </div>
          </div>
        }
      </div>
      <div className="w-full">
        {
          task.subtasks.length > 0 &&
          task.subtasks.map(subtask => <TaskItem key={subtask.id} isSubTask={true} task={subtask} />)
        }
      </div>
    </div >
  )
}

export default TaskItem