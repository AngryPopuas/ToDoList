import { Button, Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react'
import { ITask } from '../types';
import TaskCalendar from './TaskCalendar';
import dayjs, { Dayjs } from 'dayjs';

const ModalProvider = ({ isOpen, task, editCallBack }: { isOpen: boolean, task?: ITask | null, editCallBack: (task: ITask | undefined) => void }) => {

    const [isModalOpen, setIsModalOpen] = useState(isOpen);
    const [modalToEdit, setModalToEdit] = useState<ITask>()
    const [title, setTitle] = useState<string>(task?.title === undefined ? '' : task.title)
    const [date, setDate] = useState<Dayjs>()
    const [description, setDescription] = useState<string>(task?.description === undefined ? '' : task.description)

    useEffect(() => {
        setIsModalOpen(isOpen)
        if (task) {
            setModalToEdit(task)
            setTitle(task.title)
            setDescription(task.description)
        }
    }, [isOpen])



    const handleOk = () => {
        if (modalToEdit) {
            const editDate = String(date?.format())
            const editTask: ITask = {
                id: modalToEdit.id,
                title: title,
                description: description,
                time: {
                    created: modalToEdit.time.created,
                    starts: `${date?.format()}`,
                },
                isDone: modalToEdit.isDone,
                isSelected: modalToEdit.isSelected,
                isOpen: modalToEdit.isOpen,
                isEdit: modalToEdit.isEdit,
                subtasks: modalToEdit.subtasks,
            }
            editCallBack(editTask)
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            <Modal title="Изменить задачу" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className='flex flex-col space-y-5'>
                    <div>
                        <label htmlFor="title">Заголовок</label>
                        <Input
                            name='title'
                            placeholder='Заголовок'
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }}
                        />
                    </div>
                    <div>
                        <label htmlFor="descrption">Описание</label>
                        <TextArea
                            name='descrption'
                            placeholder='Описание'
                            value={description}
                            onChange={(e) => { setDescription(e.target.value) }}
                        />
                    </div>
                    <div>
                        <h1 className='text-sm font-light'>Дата:</h1>
                        <TaskCalendar dateCallBack={(date: Dayjs) => {
                            setDate(date)
                        }} />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ModalProvider