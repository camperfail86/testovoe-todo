import { useDispatch } from "react-redux";
import { AppDispatchType } from "../../shared/store/store.ts";

export const useAppDispatch = () => useDispatch<AppDispatchType>();
