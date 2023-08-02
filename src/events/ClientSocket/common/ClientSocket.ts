import LocalStorageHelpers from "@src/common/helpers/localStorageHelper";
import { IServerResponseError, IServerResponseSuccess } from "@src/repository/common/IServerResponseDTO";
import { CreateUserResponse } from "@src/repository/user/types/CreateUserResponse";
import { Socket, io } from "socket.io-client";


export default class ClientSocket {
    static instance: ClientSocket;
    private socket!: Socket;

    constructor() {
        this.connect();
    }

    public static getInstance(): ClientSocket {
        if (!ClientSocket.instance) {
            ClientSocket.instance = new ClientSocket();
        }
        return ClientSocket.instance;
    }

    public connect() {
        const user = LocalStorageHelpers.get<CreateUserResponse>('user');
        if(user){
            this.socket = io('ws://localhost:3001', {
                reconnection: true,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                reconnectionAttempts: Infinity,
                extraHeaders: {
                    authorization: `Bearer ${user.token}`,
                },
            });
        }
    }
    
    public recconect() {
        this.socket.on("reconnect", (attempt) => {
            console.log(attempt);
        });
    }

    public addListern<T>(listenerName: string, functionEvent: Function) {
        try {
            this.socket.on(listenerName, function (params: T) {
                functionEvent(params);
            });
        } catch (err) {
            this.connect();
        }
    }

    public emit<T, D = any>(event: string, data: D): Promise<T>{
        return new Promise<T>((resolve, reject) => {
            this.socket.emit(event, data, (response: IServerResponseSuccess | IServerResponseError ) => {
                if ('data' in response){
                    resolve(response.data as T);
                } else {
                    reject(response);
                }
            })
        })
    }
}