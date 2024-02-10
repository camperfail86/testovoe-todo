import  { memo, useCallback } from "react";
import { EditableSpan } from "../components/EditableSpan.tsx";
import { ButtonDelete } from "../components/ButtonDelete.tsx";
import { useAppDispatch } from "../../app/hooks/hooks.ts";
import { TaskStatuses } from "../../utils/enums";

type PropsType = {
    changeFilter?: (todolistId: string, value: any) => void;
    changeIsDone: (status: TaskStatuses, todolistId: string, id: string) => void;
    title: string;
    editSpanTodo: (title: string) => void;
    deleteTodolist: (todolistId: string) => void;
};

const Todolist = memo(
    ({
        deleteTodolist,
        title,
        editSpanTodo,
    }: PropsType) => {
        const dispatch = useAppDispatch();

        const addTaskCallback = useCallback(
            (title: string) => {
                // return dispatch(taskThunks.addTask({ todolistId: todolistId, title })).unwrap();
            },
            [ dispatch],
        );

        const onClickButtonHandler = useCallback(() => {
            // deleteTodolist(todolistId);
        }, [deleteTodolist]);

        const onChangeTitleTodo = useCallback(
            (title: string) => {
                editSpanTodo(title);
            },
            [editSpanTodo],
        );

        return (
            <div>
                <h3>
                    <EditableSpan title={title} editSpan={onChangeTitleTodo} />
                    <ButtonDelete callback={onClickButtonHandler} disabled={false} />
                </h3>
                {/*<FullInput callback={addTaskCallback} disabled={false} />*/}
                {/*<Tasks tasks={tasks} filter={filter} todolistId={todolistId} changeIsDone={changeIsDone} />*/}
                {/*<ul className={s.list}>*/}
                {/*    {tasks?.map((t: any) => {*/}
                {/*        return (*/}
                {/*            <Task*/}
                {/*                key={t.id}*/}
                {/*                task={t}*/}
                {/*                changeIsDone={changeIsDone}*/}
                {/*                entityStatus={t.entityStatus}*/}
                {/*                todolistId={todolistId}*/}
                {/*            />*/}
                {/*        );*/}
                {/*    })}*/}
                {/*</ul>*/}
            </div>
        );
    },
);

export default Todolist;
