import RequestHandler from "./RequestHandler";
import {IncomingMessage, ServerResponse} from "http";
import * as fs from "fs";
import path from "path";
import AppConfig from "../config/AppConfig";

class StaticResourceHandler implements RequestHandler {
    private config: AppConfig;

    constructor(config: AppConfig) {
        this.config = config;
    }

    handleReq(req: IncomingMessage, res: ServerResponse): void {
        let url = req.url;
        if (url) {
            let staticResourcePath = this.config.config.web.static.resource.path;
            let serverFileBasePath = this.config.config.web.root;
            let filePath = url.substring(staticResourcePath.length);
            filePath = path.join(process.cwd(), serverFileBasePath, filePath);
            let isExist = fs.existsSync(filePath);
            if (isExist) {
                let mimeType = StaticResourceHandler.mimeType(filePath);
                let buffer = fs.readFileSync(filePath);
                let stats = fs.statSync(filePath);
                let mtime = stats.mtime;
                let modifyTime = new Date(mtime).toUTCString()
                console.log(mtime, modifyTime)
                let size = stats.size;
                let etag = "W/\"" + size + "\""
                let ifModifiedSince = req.headers["if-modified-since"];
                if(ifModifiedSince){
                    let ifModifiedSinceTime = new Date(ifModifiedSince).getTime();
                    let lastModifiedTime = Math.floor(new Date(mtime).getTime() / 1000) * 1000;
                    if(ifModifiedSinceTime >= lastModifiedTime){
                        res.writeHead(304);
                        return ;
                    }
                }

                res.writeHead(200, {
                    "Content-Type": mimeType,
                    "Content-Length": buffer.length,
                    "Last-Modified": modifyTime,
                    "ETag": etag
                })
                res.write(buffer);
            } else {
                res.writeHead(404)
                res.write("404!")
            }
        }
    }

    private static mimeType(filename: string): string {
        let number = filename.lastIndexOf(".");
        let suffix = filename.substring(number);
        switch (suffix) {
            case ".html":
            case ".htm":
                return "text/html";
            case ".js":
                return "application/javascript";
            case ".css":
                return "text/css";
        }
        return "text/plain";
    }

}

export default StaticResourceHandler