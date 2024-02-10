import { appReducer } from "../../reducers/AppReducer.ts";
import { todolistsReducer } from "../../widgets/todolist/TodolistReducer.ts";
import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk, {ThunkDispatch} from "redux-thunk";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    app: appReducer,
})
export const store = legacy_createStore(rootReducer)
export type AppStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = ThunkDispatch<AppStateType, unknown, any>
// export type AppActionType = any


// export type AppDispatchType = typeof store.dispatch;
// export type AppRootStateType = ReturnType<typeof store.getState>

// export const store = configureStore({
//     reducer: {
//         todolists: todolistReducer,
//         app: appReducer,
//     }
// });
