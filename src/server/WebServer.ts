import {IncomingMessage, Server, ServerResponse} from "http";
import ServerInfo from "./ServerInfo";
import RequestDispatcher from "./RequestDispatcher";
import AppConfig from "../config/AppConfig";

const http = require('http')

class WebServer {
    host = 'localhost';
    port = 80;
    server: Server | undefined;
    serverInfo: ServerInfo;

    constructor(host: string, port: number) {
        if (host)
            this.host = host;
        if (port && port > 0)
            this.port = port;
        this.serverInfo = new ServerInfo('gyb', "1.0");
    }

    start(config: AppConfig) {
        let requestDispatcher = new RequestDispatcher(config);
        this.server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
            this.serverInfo.addServerHeader(res);
            requestDispatcher.dispatch(req, res);
            res.end();
        })
        if (this.server) {
            this.server.listen(this.port, this.host)
            console.log(`Web Server listen at ${this.host}:${this.port}...`)
        } else {
            console.error("Web Server start failed!")
        }
    }
}

export default WebServer