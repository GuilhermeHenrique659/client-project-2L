'use client'

class LocalStorageHelpers {
    static get<T>(key: string): T | undefined {
        if (typeof window !== 'undefined') {
            const data = localStorage.getItem(key);
            if (data) {
                return JSON.parse(data) as T
            }
            return;
        }
    }

    static set<T>(key: string, data: T) {
        if (typeof window !== 'undefined') {
            localStorage.setItem(key, JSON.stringify(data));
        }
    }

    static delete(key: string) {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(key);
        }
    }
}

export default LocalStorageHelpers;