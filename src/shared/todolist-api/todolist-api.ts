import {Todos} from "../../pages/todolist-list/TodolistList.tsx";

const BASE = 'http://localhost:3000/todos'

export async function fetchTodos() {
    const res = await fetch(`${BASE}`)

    return res.json()
}

export async function addTask(title: string) {
    const newTask = {id: 999, title}
    const res = await fetch(`http://localhost:3000/todos/10`, {
        method: 'POST',
        body: JSON.stringify( newTask ),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return res.json()
}