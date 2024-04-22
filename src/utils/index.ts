import { ITask } from "../types";


type SubTaskAddingProps = (
    id: number,
    array: ITask[],
    task: ITask,
) => ITask[];

type RecursionProps = (
    id: number,
    array: ITask[],
) => ITask[];

type SearchProps = (
    id: number,
    array: ITask[],
) => ITask | null;

type CompleteTogglerProps = (
    array: ITask[],
    state: boolean,
) => ITask[];
type SetActiveTaskProps = (
    array: ITask[],
    state: boolean,
) => ITask[];



export const CreateTaskTitle = (title: string) => {
    const currentDate = new Date()
    const createdAtLocal = ` ${currentDate.getDate() < 9 ? '0' + currentDate.getDate() : currentDate.getDate()}/${currentDate.getMonth() < 9 ? '0' + currentDate.getMonth() : currentDate.getMonth()} в ${currentDate.getHours() < 9 ? '0' + currentDate.getHours() : currentDate.getHours()}:${currentDate.getMinutes() < 9 ? '0' + currentDate.getMinutes() : currentDate.getMinutes()}`
    const createTask: ITask = {
        id: currentDate.getMilliseconds(),
        title: title,
        description: 'Нет описания',
        time: {
            created: createdAtLocal,
            starts: 'Нет',
        },
        isDone: false,
        isSelected: false,
        subtasks: [],
        isEdit: false,
        isOpen: false,
    }

    return createTask

}

export const subTaskAdding: SubTaskAddingProps = (id, array, task) => {
    return array.reduce((arr: ITask[], item) => {
        if (item.id === id) {
            item.subtasks.push(task);
            arr.push(item);
        } else {
            arr.push({ ...item, subtasks: subTaskAdding(id, item.subtasks, task) });
        }

        return arr;
    }, []);
};

export const recursionFilter: RecursionProps = (id, array) => {
    return array.reduce((arr: ITask[], item) => {
        if (item.id !== id) {
            arr.push({ ...item, subtasks: recursionFilter(id, item.subtasks) });
        }

        return arr;
    }, []);
};

export const recursionCompleteToggler: RecursionProps = (id, array) => {
    return array.reduce((arr: ITask[], item) => {
        if (item.id !== id) {
            arr.push({ ...item, subtasks: recursionCompleteToggler(id, item.subtasks) });
        } else {
            arr.push({
                ...item,
                isDone: !item.isDone,
                subtasks: subTasksCompleteToggler(item.subtasks, !item.isDone)
            });
        }

        return arr;
    }, []);
};

export const subTasksCompleteToggler: CompleteTogglerProps = (array, state) => {
    return array.reduce((arr: ITask[], item) => {
        arr.push({
            ...item,
            isDone: state,
            subtasks: subTasksCompleteToggler(item.subtasks, state)
        });

        return arr;
    }, []);
};

// Select task

export const subtaskSelectAll: RecursionProps = (id, array) => {
    return array.reduce((arr: ITask[], item) => {
        if (item.id !== id) {
            arr.push({ ...item, subtasks: subtaskSelectAll(id, item.subtasks) });
        } else {
            arr.push({
                ...item,
                isSelected: !item.isSelected,
                subtasks: subtaskSelect(item.subtasks, !item.isDone)
            });
        }

        return arr;
    }, []);
};

export const subtaskSelect: CompleteTogglerProps = (array, state) => {
    return array.reduce((arr: ITask[], item) => {
        arr.push({
            ...item,
            isSelected: state,
            subtasks: subtaskSelect(item.subtasks, state)
        });

        return arr;
    }, []);
};

// Delete selected or set done

export const setTaskOpen: RecursionProps = (id, array) => {
    return array.reduce((arr: ITask[], item) => {
        if (item.id === id) {
            item.isOpen = !item.isOpen
        }
        arr.push({ ...item, subtasks: setTaskOpen(id, item.subtasks) });
        return arr;
    }, []);
};

export const deleteAllSelectedTasks = (array: ITask[]) => {
    return array.reduce((arr: ITask[], item) => {
        if (!item.isSelected) {
            arr.push({ ...item, subtasks: deleteAllSelectedTasks(item.subtasks) });
        }
        return arr;
    }, []);
};
export const setEditTask = (array: ITask[], task: ITask) => {
    return array.reduce((arr: ITask[], item) => {
        if (item.id === task.id) {
            const editedTask = task
            arr.push({ ...editedTask, subtasks: setEditTask(item.subtasks, task) });
        } else {
            arr.push({ ...item, subtasks: setEditTask(item.subtasks, task) });
        }
        return arr;
    }, []);
};
// export const setOpenTaskForEdit = (array: ITask[]) => {
//     return array.reduce((arr: ITask[], item) => {
//         if (item.isSelected) {
//             item.isDone = !item.isDone
//         }
//         arr.push({ ...item, subtasks: setDoneAllSelectedTasks(item.subtasks) });
//         return arr;
//     }, []);
// };
export const setDoneAllSelectedTasks = (array: ITask[]) => {
    return array.reduce((arr: ITask[], item) => {
        if (item.isSelected) {
            item.isDone = !item.isDone
        }
        arr.push({ ...item, subtasks: setDoneAllSelectedTasks(item.subtasks) });
        return arr;
    }, []);
};
// export const findSubTask: SearchProps = (id, array) => {
//     for (let item of array) {
//         if (item.id === id) {
//             item.isDone = true
//             return [item,];
//         }

//         const subItem = findSubTask(id, item.subtasks);

//         if (subItem) {
//             return [subItem];
//         }
//     }

//     return null;
// };