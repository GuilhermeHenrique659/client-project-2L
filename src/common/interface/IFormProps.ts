import { Dispatch, SetStateAction } from "react";

export interface IFormProps<T> {
    setShowForm: () => void;
    setData: Dispatch<SetStateAction<T>>
}