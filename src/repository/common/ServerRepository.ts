import IServerRepository from "./IServerRepository";
import { IServerResponseSuccess, IServerResponseError } from "./IServerResponseDTO";
import ServerConfiguration from "./ServerHeaders";

export class ServerRepository implements IServerRepository {
    private _jwt?: string;

    private serverConfiguration = ServerConfiguration;

    constructor (private readonly _serverUrl: string){ }

    private setServerHeaders(headers: RequestInit["headers"]){
        this.serverConfiguration = {
            ...this.serverConfiguration,
            headers: {
                ...this.serverConfiguration.headers,
                ...headers,
            }
        };
    }

    private checkPayloadSize(data: string): IServerResponseError | undefined{
        const payloadSizeInBytes = new Blob([data]).size;

        const payloadSizeInMB = payloadSizeInBytes / (1024 * 1024);
        
        if(payloadSizeInMB > 18){
            return {
                error: {
                    message: 'Dados muito grande, precisa ser menos 18 mb'
                }
            }
        }
    }

    public setToken(token: string): void {
        this._jwt = token
    }

    public async get<R>(path: string, auth = true): Promise<IServerResponseSuccess<R> | IServerResponseError> {
        const url = `${this._serverUrl}/${path}`;
        
        if (auth){
            this.setServerHeaders({
                authorization: `Bearer ${this._jwt}`
            });

            const data = await (await fetch(url, { 
                ...this.serverConfiguration,
                method: 'GET',
            })).json();
            
            return data;
        }

        return await (await fetch(url)).json()
    }

    public async post<R, T>(path: string, payload: T, auth: boolean): Promise<IServerResponseSuccess<R> | IServerResponseError> {
        const url = `${this._serverUrl}/${path}`;
        const data = JSON.stringify(payload);

        const error = this.checkPayloadSize(data);
        if(error) return error;

        if (auth){
            this.setServerHeaders({
                authorization: `Bearer ${this._jwt}`
            });

            const response = await (await fetch(url, { 
                ...this.serverConfiguration,
                method: 'POST',
                body: data
            })).json();
            
            return response;
        }
        
        return await (await fetch(url, { 
            ...this.serverConfiguration,
            method: 'POST',
            body: data
        })).json();
    }

    
    public async patch<R, T>(path: string, payload: T, auth: boolean): Promise<IServerResponseSuccess<R> | IServerResponseError> {
        const url = `${this._serverUrl}/${path}`;
        const data = JSON.stringify(payload);

        const error = this.checkPayloadSize(data);
        if(error) return error;
        
        if (auth){
            this.setServerHeaders({
                authorization: `Bearer ${this._jwt}`
            });

            const response = await (await fetch(url, { 
                ...this.serverConfiguration,
                method: 'PATCH',
                body: data
            })).json();
            
            return response;
        }
        
        return await (await fetch(url, { 
            ...this.serverConfiguration,
            method: 'PATCH',
            body: data
        })).json();
    }
}

const serverRepository = new ServerRepository('http://localhost:3001');

export default serverRepository;