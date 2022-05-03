import {IncomingMessage, ServerResponse} from "http";
import StaticResourceHandler from "./StaticResourceHandler";
import AppConfig from "../config/AppConfig";

class RequestDispatcher {
    config: AppConfig;
    staticResourceHandler: StaticResourceHandler;

    constructor(config: AppConfig) {
        this.config = config
        this.staticResourceHandler = new StaticResourceHandler(this.config);
    }

    dispatch(req: IncomingMessage, res: ServerResponse): void {
        let url = req.url;
        let staticResourcePath = this.config.config.web.static.resource.path;
        if (url?.startsWith(staticResourcePath)) {
            this.staticResourceHandler.handleReq(req, res);
        } else {
            res.writeHead(200, {
                "content-disposition": "attachment; filename=21111",
                "content-type": "application/octet-stream"
            })
            res.write("fsdfsdfsdf");
            res.write("Web Server Running ...")
        }
    }
}

export default RequestDispatcher