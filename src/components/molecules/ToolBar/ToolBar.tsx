import { Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import PostForm from "../post/PostForm";
import Post from "@src/entity/Post";
import TooBarButton from "@src/components/atoms/toolbarButton/TooBarButton";
import { IToolBarProps } from "@src/common/interface/IToolBarProps";
import { IFormProps } from "@src/common/interface/IFormProps";
import React from "react";



export default function TooBar<T>({ children, setData}: PropsWithChildren<IToolBarProps<T>>) {
    const [showForm, setShowForm] = useState<boolean>(false);

    const handleShowForm = () => {
        if(showForm)
            setShowForm(false);
        else
            setShowForm(true);
    }

    const form = React.Children.map(children, child => {
        if (React.isValidElement<IFormProps<T>>(child)) {
            return React.cloneElement(child, { setShowForm: handleShowForm, setData });
        }
        return child;
    });

    return (
        <div className="my-6 mb-20 w-6/12 flex flex-col items-center max-md:w-full">
            <div className="h-10 w-96 rounded-md shadow-lg bg-button-color flex justify-center items-center">
                <TooBarButton handleAddButton={handleShowForm}></TooBarButton>
            </div>
            <div className={`h-fit w-full border mt-4 shadow-lg rounded-md z-10 origin-top-right ${!showForm && 'hidden'}`}role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                {form}
            </div>
        </div>
    )
}