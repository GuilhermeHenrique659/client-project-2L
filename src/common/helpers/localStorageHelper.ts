import AppError from "../errors/AppError";

class LocalStorageHelpers {
    static get<T>(key: string): T {
        const data = localStorage.getItem(key);
        if(data) {
            return JSON.parse(data) as T
        }

        throw new AppError({ message: 'item not found'})
    }

    static set<T>(key: string, data: T) {
        localStorage.setItem(key, JSON.stringify(data));
    }
}

export default LocalStorageHelpers;