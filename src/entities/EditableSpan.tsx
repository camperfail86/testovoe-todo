import {useState, FocusEvent, ChangeEvent, memo, ComponentPropsWithoutRef} from "react";
import TextField from "@mui/material/TextField";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {editTitle} from "../shared/todolist-api/todolist-api.ts";

export type editableSpanProps = {
    title: string;
    id: string
} & ComponentPropsWithoutRef<'span'>
export const EditableSpan = memo((props: editableSpanProps) => {
    const client = useQueryClient()
    const {mutate: editTaskTitle} = useMutation({
        mutationFn: editTitle,
        onSuccess: ()=>{
            client.invalidateQueries({queryKey: ['todos']})
        }
    })
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState("");
    const editSpanCLick = (e: FocusEvent<HTMLInputElement>) => {
        editTaskTitle({ title: e.currentTarget.value, id: props.id})
        setEditMode(false);
    };
    const onDblClick = () => {
        setEditMode(true);
        setTitle(props.title);
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    return editMode ? (
        <TextField
            onChange={onChangeHandler}
            value={title}
            onBlur={editSpanCLick}
            autoFocus={true}
            variant="standard"
        />
    ) : (
        <span className={props.className} onDoubleClick={onDblClick}>{props.title}</span>
    );
});
