import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import { useSelector } from "react-redux";
import { Dispatch } from "./store";
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = useDispatch<Dispatch>;
