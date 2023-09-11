'use client'

import AppError from "@src/common/errors/AppError";
import Input from "@src/components/atoms/input/Input";
import InputShowError from "@src/components/atoms/input/InputError";
import { HTMLInputTypeAttribute } from "react";

export interface IFormInput {
    inputName: string;
    inputId: string;
    type?: HTMLInputTypeAttribute;
    value?: any;
    onChange: (data: any) => void;
    useLabel?: boolean
}

interface IFormProps {
    inputs: IFormInput[];
    className?: string;
    appError?: AppError;
    useLabelForm?: boolean
}

export default function Form({ inputs, appError, className, useLabelForm }: IFormProps) {
    const showError = (appError && !appError.context);

    return (
        <div className={"p-2 flex flex-col " + className}>
            {
                inputs.map(({ onChange, inputId, inputName, type, useLabel, value }) => {
                    return (
                        <Input key={inputId} id={inputId} name={inputName} value={value} stateSetter={onChange} useLabel={useLabel ?? useLabelForm} type={type} error={appError}></Input>
                    )
                })
            }
            {showError && <InputShowError>{appError?.message}</InputShowError>}
        </div>
    )
}