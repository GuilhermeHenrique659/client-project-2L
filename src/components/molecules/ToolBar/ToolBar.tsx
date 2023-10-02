import { Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from "react";
import PostForm from "../post/PostForm";
import Post from "@src/entity/Post";
import TooBarButton from "@src/components/atoms/toolbarButton/TooBarButton";
import { IToolBarProps } from "@src/common/interface/IToolBarProps";
import { IFormProps } from "@src/common/interface/IFormProps";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import Notification from "@src/entity/Notification";
import notificationRepository from "@src/repository/notification/NotificationRepository";
import { IServerResponseSuccess } from "@src/repository/common/IServerResponseDTO";
import notificationSocketRepository from "@src/events/notification/notificationSocketRepository";



export default function TooBar<T>({ children, setData }: PropsWithChildren<IToolBarProps<T>>) {
    const [showForm, setShowForm] = useState<boolean>(true);
    const [showNotfication, setShowNotification] = useState(false)
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [notificationCount, setNotificationCount] = useState(0)


    const handleNewNotification = async ({ data }: IServerResponseSuccess<Notification>) => {
        setNotificationCount(currentCount => currentCount += 1);
        setNotifications(currrentNotifications => [...currrentNotifications, data])
    }

    notificationSocketRepository.socket.addListern('notification/added', handleNewNotification);

    const handleShowForm = () => {
        if (showForm)
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

    useEffect(() => {
        notificationRepository.list().then((value) => {
            setNotificationCount(value.length)
            setNotifications(value);
        })
    }, [])

    return (
        <div className="relative my-6 mb-20 w-6/12 flex flex-col items-center max-md:w-full">
            <div className="h-10 w-96 rounded-md shadow-lg bg-button-color flex justify-center items-center">
                <TooBarButton notificationCount={notificationCount} handleNotifcationButton={() => setShowNotification(!showNotfication)} handleAddButton={handleShowForm}></TooBarButton>
            </div>
            <div className={`h-fit w-full border mt-4 shadow-lg rounded-md z-10 origin-top-right ${!showForm && 'hidden'}`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                {form}
            </div>
            {showNotfication && <div className="absolute w-fit my-16 z-20">
                <div className="flex flex-col items-center p-4 bg-button-color justify-center rounded-md">
                    {notifications.length ? notifications.map((notification, index) => {
                        return <div key={index} className="flex items-center">
                            <span className="text-black">{notification.message}</span>
                            <div>
                                <button className="p-4"><FontAwesomeIcon size="xl" color="black" icon={faTrash}></FontAwesomeIcon></button>
                            </div>
                        </div>
                    }) : <>
                        <div className="flex flex-col w-96 align-middle items-center">
                            <FontAwesomeIcon size="xl" color="black" icon={faBoxOpen}></FontAwesomeIcon>
                            <h1 className="text-black text-xl p-4">Não tem nada de novo</h1>
                        </div>
                    </>}
                </div>
            </div>}
        </div>
    )
}