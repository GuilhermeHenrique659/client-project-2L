import { IContextType } from "@src/repository/common/IServerResponseDTO";

class AppError {
    public readonly message: string;

    public readonly context?: IContextType;

    constructor ({ message, context }: AppError){
        this.message = message;
        this.context = context;
    }
}

export default AppError;