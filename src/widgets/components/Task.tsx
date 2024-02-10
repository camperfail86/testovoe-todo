import React, { memo, useCallback } from "react";
import Checkbox from "@mui/material/Checkbox";
import { EditableSpan } from "./EditableSpan.tsx";
import { ButtonDelete } from "./ButtonDelete.tsx";
import { useAppDispatch } from "../../app/hooks/hooks.ts";
import { StatusType } from "../../reducers/AppReducer.ts";
import { TaskStatuses } from "../utils/enums";

export type TaskPropsType = {
    task: any;
    changeIsDone: (status: TaskStatuses, todolistId: string, id: string) => void;
    todolistId: string;
    entityStatus: StatusType;
};

export const Task = memo(({ entityStatus, task, changeIsDone, todolistId }: TaskPropsType) => {
    const dispatch = useAppDispatch();
    const onClickHandler = useCallback(() => {
        // dispatch(removeTaskAC(todolistId, task.id))
        // dispatch(taskThunks.deleteTask({todolistId, taskId: task.id}));
    }, [task.id, dispatch]);

    const onChangeHandler = useCallback(
        () => changeIsDone(task.status, todolistId, task.id),
        [task.status, task.id, changeIsDone],
    );

    const onChangeTitle = useCallback(
        (title: string) => {
            // dispatch(taskThunks.editSpanTask({title, todolistId, id: task.id}));
        },
        [task.id, dispatch],
    );

    return (
        <li key={task.id}>
            <Checkbox
                size={"small"}
                onChange={onChangeHandler}
                checked={!!task.status}
                disabled={entityStatus === "loading"}
                color="secondary"
            />
            <EditableSpan title={task.title} editSpan={onChangeTitle} />
            <ButtonDelete callback={onClickHandler} disabled={entityStatus === "loading"} />
        </li>
    );
});
