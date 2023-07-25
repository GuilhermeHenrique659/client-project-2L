'use client'

class LocalStorageHelpers {
    static get<T>(key: string): T | undefined {
        const data = localStorage.getItem(key);
        if(data) {
            return JSON.parse(data) as T
        }
        return;
    }

    static set<T>(key: string, data: T) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    static delete(key: string){
        localStorage.removeItem(key);
    }
}

export default LocalStorageHelpers;