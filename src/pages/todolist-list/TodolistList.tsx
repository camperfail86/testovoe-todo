import { useEffect, useState, DragEvent } from "react";
// import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";
import { FullInput } from "../../widgets/components/FullInput.tsx";
// import EditIcon from '@mui/icons-material/Edit';
import {EditableSpan} from "../../widgets/components/EditableSpan.tsx";
// import {ButtonDelete} from "../../widgets/components/ButtonDelete.tsx";
import { useQuery } from "@tanstack/react-query";
import {deleteItem, fetchTodos} from "../../shared/todolist-api/todolist-api.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
// import IconButton from "@mui/material/IconButton/IconButton";


export const TodolistList = () => {
    const {data: boards, isLoading} = useQuery({
        queryFn: ()=>fetchTodos(),
        queryKey: ['todos']
    })
    // const [boards, setBoards] = useState<any[]>([]);

    const client = useQueryClient()
    const {mutate: deleteElem} = useMutation({
        mutationFn: deleteItem,
        onSuccess: () => {
            client.invalidateQueries({queryKey: ['todos']}).then((data) => console.log(data))
        },
    })

    useEffect(() => {
        // if (!isLoading && data) {
        //     setBoards(data)
        // }
    }, [isLoading]);


    const [currentBoard, setCurrentBoard] = useState<any>()
    const [currentItem, setCurrentItem] = useState<any>()

    const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }
    const dragStartHandler = (board: any, item: any) => {
        setCurrentBoard(board)
        setCurrentItem(item)
    }
    const dropHandler = (e: DragEvent<HTMLHeadingElement>, targetBoard: any, targetItem: any) => {
        e.preventDefault();

        const updatedBoards = boards.map((b) => {
            if (b.id === currentBoard.id) {
                const updatedItems = currentBoard.items.filter((item) => item.id !== currentItem.id);
                return { ...b, items: updatedItems };
            }
            if (b.id === targetBoard.id) {
                const updatedTargetItems = [...targetBoard.items]; // Создаем копию массива targetBoard.items
                const dropIndex = updatedTargetItems.findIndex((item) => item.id === targetItem.id);
                updatedTargetItems.splice(dropIndex + 1, 0, currentItem);

                return { ...b, items: updatedTargetItems };
            }
            return b;
        });

        // setBoards(updatedBoards);
    };

    const dropCardHandler = (targetBoard: any) => {
        const updatedBoards = boards.map((b) => {
            if (b.id === currentBoard.id) {
                const updatedItems = currentBoard.items.filter((item) => item.id !== currentItem.id);
                return { ...b, items: updatedItems };
            }
            if (b.id === targetBoard.id) {
                return { ...b, items: [...targetBoard.items, currentItem] };
            }
            return b;
        });

        // setBoards(updatedBoards);
    };
    // boardId: number,


    // const addTask = (title: string) => {
    //     console.log(title)
    //     const newTask = {id: 123123, title: title}
    //     const updatedBoards = boards.map((b) => {
    //         if (b.id === '10') {
    //             return { ...b, items: [...b.items, newTask] };
    //         }
    //         return b;
    //     });
    //     setBoards(updatedBoards)
    // }

    const deleteTask = (itemId: string) => {
        // const updatedBoards = boards.map((b) => {
        //     if (b.id === boardId) {
        //         const updatedItems = b.items.filter((item) => item.id !== itemId);
        //         return { ...b, items: updatedItems };
        //     }
        //     return b;
        // });
        // setBoards(updatedBoards)
        deleteElem(itemId)
    }

    if (isLoading) {
        return <div>loading</div>
    }

    return (
        <div className='todolist'>
            <div style={{ padding: "20px 0" }}>
                <FullInput/>
            </div>
            <div className='todolists'>
            <ul
                className='columns'>
                <h3>Сделать</h3>
                {boards.map(b => b.state === 'start' ?
                    <li draggable={true}>
                        <EditableSpan id={b.id} title={b.title}></EditableSpan>
                        <button onClick={()=>deleteTask(b.id)}>x</button>
                </li> : null)}
            </ul>
            <ul className='columns'>
                <h3>В процессе</h3>
                {boards.map(b => b.state === 'inProgress' ?
                    <li draggable={true}>
                        <EditableSpan id={b.id} title={b.title}></EditableSpan>
                        <button onClick={()=>deleteTask(b.id)}>x</button>
                </li> : null)}
            </ul>
            <ul className='columns'>
                <h3>Выполнено</h3>
                {boards.map(b => b.state === 'fullfiled' ?
                    <li draggable={true}>
                        <EditableSpan id={b.id} title={b.title}></EditableSpan>
                        <button onClick={()=>deleteTask(b.id)}>x</button>
                </li> : null)}
            </ul>
            </div>
        </div>
    );
};

//{
//  "todos": [
//    {
//      "id": "10",
//      "title": "Сделать",
//      "items": [
//        {
//          "id": 1,
//          "title": "first"
//        },
//        {
//          "id": 2,
//          "title": "second"
//        }
//      ]
//    },
//    {
//      "id": "20",
//      "title": "В процессе",
//      "items": [
//        {
//          "id": 3,
//          "title": "sdelal"
//        },
//        {
//          "id": 4,
//          "title": "toje sdelal"
//        }
//      ]
//    },
//    {
//      "id": "30",
//      "title": "Выполнено",
//      "items": [
//        {
//          "id": 5,
//          "title": "hello"
//        },
//        {
//          "id": 6,
//          "title": "bye"
//        }
//      ]
//    }
//  ]
//}

// export interface Todos {
//     todos: ObjectTodos[];
// }
// export interface ObjectTodosItems {
//     id: number;
//     title: string;
// }
// export interface ObjectTodos {
//     id: number;
//     title: string;
//     items: ObjectTodosItems[];
// }

