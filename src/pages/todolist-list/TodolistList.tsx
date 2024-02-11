import { useState, DragEvent } from "react";
import { FullInput } from "../../widgets/components/FullInput.tsx";
import {EditableSpan} from "../../widgets/components/EditableSpan.tsx";
import {ButtonDelete} from "../../widgets/components/ButtonDelete.tsx";
import { useQuery } from "@tanstack/react-query";
import {changeState, deleteItem, fetchTodos} from "../../shared/todolist-api/todolist-api.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export type Item = {
    id: string;
    title: string;
    state: string;
}

export type Boards = {
    todos: Item[]
}

export const TodolistList = () => {
    const {data: boards, isLoading} = useQuery({
        queryFn: ()=>fetchTodos(),
        queryKey: ['todos']
    })

    const client = useQueryClient()
    const {mutate: deleteElem} = useMutation({
        mutationFn: deleteItem,
        onSuccess: () => {
            client.invalidateQueries({queryKey: ['todos']})
        },
    })
    const {mutate: change} = useMutation({
        mutationFn: changeState,
        onSuccess: () => {
            client.invalidateQueries({queryKey: ['todos']})
        },
    })

    const [currentItem, setCurrentItem] = useState<Item>()

    const dragOverHandler = (e: DragEvent<HTMLLIElement>) => {
        e.preventDefault()
    }
    const dragStartHandler = (item: Item) => {
        setCurrentItem(item)
    }
    const dropHandler = (e: DragEvent<HTMLLIElement>) => {
        e.preventDefault();
    };

    const dropCardHandler = (e: DragEvent<HTMLUListElement>, targetBoard: string) => {
        e.preventDefault()
        if (currentItem) {
            change({state: targetBoard, id: currentItem.id})
        }
    };

    const deleteTask = (itemId: string) => {
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
                onDrop={(e)=>dropCardHandler(e, 'start')}
                className='columns'>
                <h3>Сделать</h3>
                {boards.map((b: Item) => b.state === 'start' ?
                    <li draggable={true}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDragStart={() => dragStartHandler(b)}
                        onDrop={(e) => dropHandler(e)}
                    >
                        <EditableSpan id={b.id} title={b.title}></EditableSpan>
                        <ButtonDelete callback={()=>deleteTask(b.id)}/>
                </li> : null)}
            </ul>
            <ul className='columns'
                onDrop={(e)=>dropCardHandler(e, 'inProgress')}>
                <h3>В процессе</h3>
                {boards.map((b: Item) => b.state === 'inProgress' ?
                    <li draggable={true}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDragStart={() => dragStartHandler(b)}
                        onDrop={(e) => dropHandler(e)}
                    >
                        <EditableSpan id={b.id} title={b.title}></EditableSpan>
                        <ButtonDelete callback={()=>deleteTask(b.id)}/>
                </li> : null)}
            </ul>
            <ul className='columns'
                onDrop={(e)=>dropCardHandler(e, 'fullfiled')}>
                <h3>Выполнено</h3>
                {boards.map((b: Item) => b.state === 'fullfiled' ?
                    <li draggable={true}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDragStart={() => dragStartHandler(b)}
                        onDrop={(e) => dropHandler(e)}
                    >
                        <EditableSpan id={b.id} title={b.title}></EditableSpan>
                        <ButtonDelete callback={()=>deleteTask(b.id)}/>
                </li> : null)}
            </ul>
            </div>
        </div>
    );
};