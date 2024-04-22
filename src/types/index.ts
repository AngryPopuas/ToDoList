

export interface ITask {
    id: number,
    title: string,
    description: string,
    time: {
        created: string | null,
        starts: string | null,
    },
    isDone: boolean,
    isSelected: boolean,
    isOpen: boolean,
    isEdit: boolean,
    subtasks: Array<ITask>,

}

export interface IStoreTasks {
    tasks: Array<ITask>
}
export interface IStoreModal {
    isOpen: boolean,
    task: ITask | null,
}