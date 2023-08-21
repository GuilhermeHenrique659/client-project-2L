import ServerEnvConfig from "../env/ServerEnvConfig";

const baseUrl = ServerEnvConfig.getServerIp()

const serverConfig = {
    endpoint: {
        path: {
            file: `${baseUrl}/file/`
        }
    }
}

export default serverConfig;