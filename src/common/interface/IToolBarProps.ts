import { Dispatch, SetStateAction } from "react";

export interface IToolBarProps<T> {
    setData: Dispatch<SetStateAction<T>>
}
