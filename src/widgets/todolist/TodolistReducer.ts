export type RemoveTodoList = ReturnType<typeof RemoveTodolistAC>
export type AddTodoList = ReturnType<typeof AddTodolistAC>
// export type SetTodoList = ReturnType<typeof SetTodolistAC>

type ActionsType =
    ReturnType<typeof ChangeTitleTodolistAC>
    | ReturnType<typeof ChangeFilterTodolistAC>
    | RemoveTodoList
    | AddTodoList
    // | SetTodoList


export const initialState = []


//функция не имеет право менять state! сначала нужно создать копию
export const todolistsReducer = (state = initialState, action: ActionsType) => { //должны всегда вернуть массив
    switch (action.type) {
        // case "REMOVE-TODOLIST": {
        //     return state.filter(t => t.id !== action.id)
        // }
        // case "ADD-TODOLIST": {
        //     const newTodolist: TodolistDomainType = { ...action.todolist, filter: "all" } //todolist который приходит с сервера и добавила нужное мне расширение
        //     положили старые листы в массив и добавили новый(объект)!
        //     return [newTodolist, ...state]
        // }
        // case "CHANGE-TODOLIST-TITLE": {
        //     return state.map(t => t.id === action.todolistId ? { ...t, title: action.title } : t)
        // }
        // case "CHANGE-TODOLIST-FILTER": {
        //     return state.map(t => t.id === action.id ? { ...t, filter: action.filter } : t)
        // }
        // case "SET-TODOLIST": {
        //     //установка прилетеших из сервера тудулитсов с нужным нам дополнительным расширением filter
        //     return action.todolists.map(tl => {
        //         return {
        //             ...tl,
        //             filter: "all"
        //         }
        //     })
        // }
        default:
            return state;
    }
}


//action creator
export const RemoveTodolistAC = (todolistId: string) => {
    return { type: 'REMOVE-TODOLIST', id: todolistId } as const
}

export const AddTodolistAC = (todolist: any) => {
    return {
        type: 'ADD-TODOLIST',
        todolist: todolist
    } as const
}

export const ChangeTitleTodolistAC = (title: string, todolistId: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        todolistId: todolistId,
        title: title
    } as const
}

export const ChangeFilterTodolistAC = (filter: any, id: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: id,
        filter: filter
    } as const
}


// export const SetTodolistAC = (todolists: TodolistTypeApi[]) => { //фиксирую прилетевшие с сервера todolists
//     return {
//         type: 'SET-TODOLIST',
//         todolists: todolists
//     } as const
// }


// export const getTodolistTC = (dispatch: Dispatch) => { //функц прослойка для dispatch api
//     todolistsApi.getTodoslists()
//         .then((res) => {
//             dispatch(SetTodolistAC(res.data))
//         })
// }


// export const removeTodolistTC = (todolistId: string) => { //функц прослойка для dispatch api
//     return (dispatch: Dispatch) => {
//         todolistsApi.deleteTodoslist(todolistId)
//             .then((res) => {
//                 dispatch(RemoveTodolistAC(todolistId))
//             })
//     }
// }
//
//
// export const addTodolistTC = (title: string) => { //функц прослойка для dispatch api
//     return (dispatch: Dispatch) => {
//         todolistsApi.createTodoslist(title)
//             .then((res) => {
//                 dispatch(AddTodolistAC(res.data.data.item))
//             })
//     }
// }
//
//
// export const changeTitleTodolistTC = (todolistId: string, title: string) => { //функц прослойка для dispatch api
//     return (dispatch: Dispatch) => {
//         todolistsApi.updateTodoslist(todolistId, title)
//             .then((res) => {
//                 dispatch(ChangeTitleTodolistAC(title, todolistId))
//             })
//     }
// }






// import { todolistAPI, TodolistType } from "../api/todolist-api";
// import { appActions, StatusType } from "./AppReducer";
// import { handleServerNetworkError } from "../utils/error-utils";
// import { createSlice, isRejected, PayloadAction } from "@reduxjs/toolkit";
// import { ResultCode } from "../utils/enums";
// import { createAppAsyncThunk } from "../utils/createAppAsyncThunk";
//
// const slice = createSlice({
//     initialState: [] as TodolistsMainType[],
//     name: "todolist-slice",
//     reducers: {
//         setTodolist: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
//             action.payload.todolists.forEach((tl) => {
//                 state.push({ ...tl, filter: "all", entityStatus: "idle" });
//             });
//         },
//         changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; entityStatus: StatusType }>) => {
//             const index = state.findIndex((todo) => todo.id === action.payload.id);
//             if (index !== -1) state[index].entityStatus = action.payload.entityStatus;
//         },
//         changeFilter: (state, action: PayloadAction<{ todolistId: string; value: FilterValuesType }>) => {
//             const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
//             if (index !== -1) state[index].filter = action.payload.value;
//         },
//         deleteStateTodo: (state, action) => {
//             state.splice(0, state.length);
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(createTodolist.fulfilled, (state, action) => {
//                 state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" });
//             })
//             .addCase(deleteTodolist.fulfilled, (state, action) => {
//                 const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
//                 if (index !== -1) {
//                     state.splice(index, 1);
//                 }
//             })
//             .addCase(fetchTodolists.fulfilled, (state, action) => {
//                 action.payload.todolists.forEach((tl) => {
//                     state.push({ ...tl, filter: "all", entityStatus: "idle" });
//                 });
//             })
//             .addCase(editTitleTodo.fulfilled, (state, action) => {
//                 const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
//                 if (index !== -1) state[index].title = action.payload.title;
//             })
//             .addMatcher(isRejected(todolistThunks.deleteTodolist), (state, action) => {
//                 const todo = state.find((todo) => todo.id === action.meta.arg.todolistId);
//                 if (todo) {
//                     todo.entityStatus = "idle";
//                 }
//             });
//     },
// });
//
// export type FilterValuesType = "all" | "completed" | "active";
// export type TodolistsMainType = TodolistType & {
//     filter: FilterValuesType;
//     entityStatus: StatusType;
// };
//
// const fetchTodolists = createAppAsyncThunk<{
//     todolists: TodolistType[];
// }>("todolists/fetchTodolist", async (arg, thunkAPI) => {
//     const res = await todolistAPI.getTodo();
//     return { todolists: res.data };
// });
//
// const deleteTodolist = createAppAsyncThunk<{ todolistId: string }, { todolistId: string }>(
//     "todolist/deleteTodolist",
//     async (arg, thunkAPI) => {
//         const { dispatch, rejectWithValue } = thunkAPI;
//         dispatch(todolistActions.changeTodolistEntityStatus({ id: arg.todolistId, entityStatus: "loading" }));
//         try {
//             const res = await todolistAPI.deleteTodo(arg.todolistId);
//             dispatch(todolistActions.changeTodolistEntityStatus({ id: arg.todolistId, entityStatus: "succeeded" }));
//             return { todolistId: arg.todolistId };
//         } catch (e: any) {
//             handleServerNetworkError(e, dispatch);
//             return rejectWithValue(null);
//         }
//     },
// );
//
// const createTodolist = createAppAsyncThunk<{ todolist: TodolistType }, { title: string }>(
//     "todolist/createTodolist",
//     async (arg, thunkAPI) => {
//         const { dispatch, rejectWithValue } = thunkAPI;
//         const res = await todolistAPI.createTodo(arg.title);
//         if (res.data.resultCode === ResultCode.success) {
//             console.log(res.data.data.item);
//             return { todolist: res.data.data.item };
//         } else {
//             if (res.data.messages.length) {
//                 dispatch(appActions.setError({ error: res.data.messages[0] }));
//             }
//             return rejectWithValue(res.data);
//         }
//     },
// );
//
// const editTitleTodo = createAppAsyncThunk<any, { todolistId: string; title: string }>(
//     "todolist/editTitleTodo",
//     async (arg, thunkAPI) => {
//         const { dispatch, rejectWithValue } = thunkAPI;
//         dispatch(appActions.setStatus({ status: "loading" }));
//         try {
//             const res = await todolistAPI.updateTodo(arg.todolistId, arg.title);
//             dispatch(appActions.setStatus({ status: "succeeded" }));
//             return { todolistId: arg.todolistId, title: arg.title };
//         } catch (e: any) {
//             handleServerNetworkError(e, dispatch);
//             return rejectWithValue(null);
//         }
//     },
// );
//
// export const todolistReducer = slice.reducer;
// export const todolistActions = slice.actions;
// export const todolistThunks = { createTodolist, deleteTodolist, editTitleTodo, fetchTodolists };
