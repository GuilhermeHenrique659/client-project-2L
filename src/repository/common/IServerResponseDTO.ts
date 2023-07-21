export interface IServerResponseSuccess<T = Record<string, unknown>> {
    data: T
}

export interface IContextType {
    label: string,
    key: string
}

export interface IServerResponseError{
    error: {
        message: string
        context?: IContextType
    }
}