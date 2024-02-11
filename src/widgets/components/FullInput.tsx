import { ChangeEvent, memo, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {addTask} from "../../shared/todolist-api/todolist-api.ts";

const btnStyle = {
    maxWidth: "40px",
    minWidth: "40px",
    maxHeight: "39px",
    minHeight: "39px",
    marginLeft: "5px",
    backgroundColor: "black",
};

export const FullInput = memo(() => {
    const client = useQueryClient()
    const {mutate: create} = useMutation({
        mutationFn: addTask,
        onSuccess: ()=>{
            client.invalidateQueries({queryKey: ['todos']})
        }
    })
    const [error, setError] = useState(false);
    const [title, setTitle] = useState("");
    const onClickHandler = () => {
            if (title.trim() !== "") {
                setError(false);
                create(title)
                setTitle('')
                // props.callback(title)
            } else {
                setError(true)
            }
    };

    return (
        <div>
            <TextField
                id="outlined-basic"
                label={error ? "Введите текст" : "Добавьте задачу"}
                variant="outlined"
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
                error={error}
                helperText={error ? "Title is required" : ""}
                size="small"
            />
            <Button style={btnStyle} onClick={onClickHandler} variant="contained">
                +
            </Button>
        </div>
    );
});
