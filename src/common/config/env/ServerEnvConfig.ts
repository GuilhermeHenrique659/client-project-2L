import { env } from "process";

class ServerEnvConfig {
    static getSocketIP() {
        return env.SERVER_WS ?? 'ws://localhost:3001'
    }

    static getServerIp() {
        return env.SERVER_HTTP ?? 'http://localhost:3001'
    }
}

export default ServerEnvConfig;