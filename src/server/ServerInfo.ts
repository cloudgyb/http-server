import {ServerResponse} from "http";

class ServerInfo {
    private readonly name: string;
    private readonly version: string;

    constructor(name: string, version: string) {
        this.name = name;
        this.version = version;
    }

    serverName() {
        return this.name + '/' + this.version
    }

    addServerHeader(res: ServerResponse) {
        res.setHeader("Server", this.serverName())
    }
}

export default ServerInfo
