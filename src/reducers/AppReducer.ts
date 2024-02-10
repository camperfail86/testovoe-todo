// import { AppDispatchType} from "../redux/redux-store";
// import {setAuthTC} from "./authReducer";

export type AuthType = {
    error: string | null
    initialized: boolean
}

const initialState: AuthType = {
    error: null,
    initialized: false
}

export type AppAllActionType = SetInitializedType

export const appReducer = (state = initialState, action: AppAllActionType) => {
    switch (action.type) {
        case "APP/SET-INITIALIZED": {
            return {...state, initialized: action.payload.initialized}
        }
        default:
            return state
    }
}

export type SetInitializedType = ReturnType<typeof setInitializedAC>
export const setInitializedAC = (initialized: boolean) => {
    return {
        type: 'APP/SET-INITIALIZED',
        payload: {initialized}
    } as const
}

// export const initializeTC = () => (dispatch: AppDispatchType) => {
//     const promise = dispatch(setAuthTC())
//     promise.then(()=> {
//         dispatch(setInitializedAC(true))
//     })
// }


