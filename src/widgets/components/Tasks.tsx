import React from "react";
import s from "./todolist.module.css";
import { Task } from "./Task.tsx";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { TaskStatuses } from "../../utils/enums";
import { FilterValuesType } from "../todolist/TodolistReducer.ts";

type Props = {
    todolistId: string;
    tasks: any
    // tasks: TaskMainType
    changeIsDone: (status: TaskStatuses, todolistId: string, id: string) => void;
}

export const Tasks = ({tasks, todolistId, changeIsDone}: Props) => {
    const [listRef] = useAutoAnimate<HTMLUListElement>();

    return (
        <ul className={s.list} ref={listRef}>
            {tasksForTodolist?.map((t: any) => {
                return (
                    <Task
                        key={t.id}
                        task={t}
                        changeIsDone={changeIsDone}
                        entityStatus={t.entityStatus}
                        todolistId={todolistId}
                    />
                );
            })}
        </ul>
    );
};
