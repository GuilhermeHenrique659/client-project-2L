import AppError from "@src/common/errors/AppError";
import HttpMethods from "./HttpMethods";
import IServerRepository from "./IServerRepository";
import { IServerResponseSuccess, IServerResponseError } from "./IServerResponseDTO";
import ServerConfiguration from "./ServerHeaders";
import ServerEnvConfig from "@src/common/config/env/ServerEnvConfig";

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

    private checkPayloadSize(data: string): void{
        const payloadSizeInBytes = new Blob([data]).size;

        const payloadSizeInMB = payloadSizeInBytes / (1024 * 1024);
        
        if(payloadSizeInMB > 18){
            throw new AppError({
                    message: 'Dados muito grande, precisa ser menos 18 mb'
            })
        }
    }

    private async request<R>(url: string, method: HttpMethods, data?: string): Promise<IServerResponseSuccess<R>> {
        return new Promise(async (resolve, rejects) => {
            const response = await fetch(url,{ 
                ...this.serverConfiguration,
                method: method,
                ...(data && {body: data})
            });

            const responseParsed = await response.json();

            if('data' in responseParsed){                
                resolve(responseParsed);
            } else {
                rejects(responseParsed);
            }
        })
    }

    public setToken(token: string): void {
        this._jwt = token
    }

    public async get<R>(path: string, auth = true): Promise<IServerResponseSuccess<R>> {
        const url = `${this._serverUrl}/${path}`;
        
        if (auth){
            this.setServerHeaders({
                authorization: `Bearer ${this._jwt}`
            });

            return await this.request(url, HttpMethods.GET);
        }
        return await this.request(url, HttpMethods.GET);
    }

    public async post<R, T>(path: string, payload?: T, auth = true): Promise<IServerResponseSuccess<R>> {
        const url = `${this._serverUrl}/${path}`;
        const data = JSON.stringify(payload);
        
        this.checkPayloadSize(data);
        if (auth){
            this.setServerHeaders({
                authorization: `Bearer ${this._jwt}`
            });

            return await this.request(url, HttpMethods.POST, data);
        }
        
        return await this.request(url, HttpMethods.POST, data);
    }

    
    public async patch<R, T>(path: string, payload?: T, auth = true): Promise<IServerResponseSuccess<R>> {
        const url = `${this._serverUrl}/${path}`;
        const data = JSON.stringify(payload);

        this.checkPayloadSize(data);        
        if (auth){
            this.setServerHeaders({
                authorization: `Bearer ${this._jwt}`
            });

            return await this.request(url, HttpMethods.PATCH, data);
        }
        
        return await this.request(url, HttpMethods.PATCH, data);
    }
}

const serverRepository = new ServerRepository(ServerEnvConfig.getServerIp());

export default serverRepository;