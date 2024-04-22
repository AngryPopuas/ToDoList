import { useState } from 'react';
import Header from './components/Header';
import ModalProvider from './components/Modal';
import TaskCreate from './components/TaskCreate';
import TaskList from './components/TaskList';
import TasksActions from './components/TasksActions';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { ITask } from './types';
import { storeSetEditTask } from './store/slices/tasksSlice';

function App() {
  const dispatch = useAppDispatch()
  const modal = useAppSelector(store => store.modals)

  const handleEditTask = (task: ITask | undefined) => {
    console.log(task)
    if (task) {
      dispatch(storeSetEditTask({task:task}))
    }
  }
  return (
    <div className="App">
      <div className='flex flex-col min-h-screen min-w-screen'>
        <Header />
        <ModalProvider editCallBack={handleEditTask} isOpen={modal.isOpen} task={modal.task} />
        <main className='grow w-full bg-[#1A1A1A]'>
          <div className='max-w-[836px] px-5 mx-auto w-full space-y-5 mt-5'>
            <TaskCreate />
            <TasksActions />
            <TaskList />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
