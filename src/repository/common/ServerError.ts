import { Dispatch } from "react";
import { IServerResponseError } from "./IServerResponseDTO";
import AppError from "@src/common/errors/AppError";

export default function ServerError(data: IServerResponseError,setError: Dispatch<AppError>) {
    if ("error" in data) {
        const { error } = data;
        const { message, context } = error;
        setError(new AppError({ message, context }));
    }
}
