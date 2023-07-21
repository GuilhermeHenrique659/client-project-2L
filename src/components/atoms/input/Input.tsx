import React, { Dispatch, ChangeEvent, HtmlHTMLAttributes, useState } from "react";
import InputShowError from "./InputError";
import AppError from "@src/common/errors/AppError";

type InputProps<T> = {
    id: string;
    name: string;
    stateSetter: Dispatch<T>;
    error?: AppError;
} & Partial<React.HTMLProps<any>>

export default function Input<T>(props: InputProps<T>) {
    
    const inputValueChange = (e: ChangeEvent<HTMLInputElement>, stateSetter: Dispatch<T>) => {
        e.preventDefault();
        const value = e.target.value as T
        stateSetter(value);
    }

    const { context , message } = props?.error ?? {};
    const showErrorMessage = context?.label === props.id;

    
    return (
        <>
            <div className="p-2 flex flex-col whitespace-normal overflow-ellipsis">
                <label className="mb-3 text-lg " htmlFor={props.id}>{props.name}</label>
                <input id={props.id}
                    onChange={e => inputValueChange(e, props.stateSetter)}
                    className={` bg-input-bg rounded-md mb-2 w-fit h-7 p-3 shadow-lg ${showErrorMessage ? ' border  border-red-600 ' : ''}` + props.className}
                    placeholder={props.name} type={props.type}
                    max={props.max}
                    min={props.min} />
            </div>
            {showErrorMessage && <InputShowError>{message}</InputShowError>}
        </>
    )
}