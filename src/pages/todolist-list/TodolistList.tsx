import { useEffect, useState, DragEvent } from "react";
// import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";
import { FullInput } from "../../widgets/components/FullInput.tsx";
// import EditIcon from '@mui/icons-material/Edit';
import {EditableSpan} from "../../widgets/components/EditableSpan.tsx";
import {ButtonDelete} from "../../widgets/components/ButtonDelete.tsx";
import { useQuery } from "@tanstack/react-query";
import {fetchTodos} from "../../shared/todolist-api/todolist-api.ts";
// import IconButton from "@mui/material/IconButton/IconButton";

export interface Todos {
	todos: ObjectTodos[];
}
export interface ObjectTodosItems {
	id: number;
	title: string;
}
export interface ObjectTodos {
	id: number;
	title: string;
	items: ObjectTodosItems[];
}

export const TodolistList = () => {
    // const [boards, setBoards] = useState([
    //     {id: 10, title: 'Сделать',
    //         items: [
    //             {id: 1, title: 'first'},
    //             {id: 2, title: 'second'}
    //         ]
    //     },
    //     {id: 20, title: 'В процессе',
    //         items: [
    //             {id: 3, title: 'sdelal'},
    //             {id: 4, title: 'toje sdelal'}
    //         ]
    //     },
    //     {id: 30, title: 'Выполнено',
    //         items: [
    //             {id: 5, title: 'hello'},
    //             {id: 6, title: 'bye'}
    //         ]
    //     },
    // ]);


    const {data, isLoading} = useQuery({
        queryFn: ()=>fetchTodos(),
        queryKey: ['todos']
    })
    const [boards, setBoards] = useState<ObjectTodos[]>([]);

    useEffect(() => {
        if (!isLoading && data) {
            setBoards(data)
        }
    }, [isLoading]);


    const [currentBoard, setCurrentBoard] = useState<ObjectTodos>()
    const [currentItem, setCurrentItem] = useState<ObjectTodosItems>()

    const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }
    const dragStartHandler = (board: ObjectTodos, item: ObjectTodosItems) => {
        setCurrentBoard(board)
        setCurrentItem(item)
    }
    const dropHandler = (e: DragEvent<HTMLHeadingElement>, targetBoard: any, targetItem: ObjectTodosItems) => {
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

        setBoards(updatedBoards);
    };

    const dropCardHandler = (targetBoard: ObjectTodos) => {
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

        setBoards(updatedBoards);
    };

    const deleteTask = (boardId: number, itemId: number) => {
        const updatedBoards = boards.map((b) => {
            if (b.id === boardId) {
                const updatedItems = b.items.filter((item) => item.id !== itemId);
                return { ...b, items: updatedItems };
            }
            return b;
        });
        setBoards(updatedBoards)
    }

    const addTask = (title: string) => {
        console.log(title)
        const newTask = {id: 123123, title: title}
        const updatedBoards = boards.map((b) => {
            if (b.id === '10') {
                return { ...b, items: [...b.items, newTask] };
            }
            return b;
        });
        setBoards(updatedBoards)
    }

    if (isLoading) {
        return <div>loading</div>
    }

    return (
        <div className='todolist'>
            <div style={{ padding: "20px 0" }}>
                <FullInput callback={addTask}/>
            </div>
            <div
                className='columns'>
                {boards.map((board) => {
                    return (
                        <div className='column'
                             key={board.id}
                             onDragOver={(e) => dragOverHandler(e)}
                             onDrop={() => dropCardHandler(board)}
                        >
                            <h2>{board.title}</h2>
                            {board.items.map((item: {id: number, title: string}) => {
                                const edit = (title: string) => {
                                    const updatedBoards = boards.map((b) => {
                                        if (b.id === board.id) {
                                            const updatedItems = b.items.map((item) => item.id === itemId ? {...b, title: title} : b);
                                            return updatedItems;
                                        }
                                    });
                                    setBoards(updatedBoards)
                                }
                                return (
                                    <h3
                                        key={item.id}
                                        onDragOver={(e) => dragOverHandler(e)}
                                        onDragStart={() => dragStartHandler(board, item)}
                                        onDrop={(e) => dropHandler(e, board, item)}
                                        draggable={true}>
                                        {/*{item.title}*/}
                                        <EditableSpan editSpan={edit} title={item.title}></EditableSpan>
                                        <ButtonDelete callback={()=>deleteTask(board.id, item.id)}/>
                                    </h3>
                                );
                            })}
                        </div>)
                })}
            </div>
        </div>
    );
};

