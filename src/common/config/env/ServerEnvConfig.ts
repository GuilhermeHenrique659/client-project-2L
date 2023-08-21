import dotenv from 'dotenv';

dotenv.config();

class ServerEnvConfig {
    static getSocketIP() {
        return process.env.NEXT_PUBLIC_SERVER_WS ?? 'ws://localhost:3001'
    }

    static getServerIp() {
        console.log(process.env.NEXT_PUBLIC_SERVER_HTTP);
        
        return process.env.NEXT_PUBLIC_SERVER_HTTP ?? 'http://localhost:3001'
    }
}

export default ServerEnvConfig;