import { v4 as uuidv4 } from 'uuid';
const BASE = 'http://localhost:3000/todos'

type Edit = {
    title: string,
    id: string
}

type Change = {
    state: string,
    id: string
}

export async function fetchTodos() {
    const res = await fetch(`${BASE}`)
    return res.json()
}

export async function changeState(props: Change) {
    const res = await fetch(`http://localhost:3000/todos/${props.id}`, {
        method: 'PATCH',
        body: JSON.stringify( {state: props.state} ),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return res.json()
}

export async function addTask(title: string) {
    const newTask = {id: uuidv4(), title, state: 'start'}
    const res = await fetch(`http://localhost:3000/todos`, {
        method: 'POST',
        body: JSON.stringify( newTask ),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return res.json()
}

export async function editTitle(props: Edit) {
    const res = await fetch(`http://localhost:3000/todos/${props.id}`, {
        method: 'PATCH',
        body: JSON.stringify( {title: props.title} ),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return res.json()
}

export async function deleteItem(id: string) {
    const res = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return res.json()
}