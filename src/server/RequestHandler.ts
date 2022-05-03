import {IncomingMessage, ServerResponse} from "http";

interface RequestHandler {
    handleReq(req: IncomingMessage, res: ServerResponse): void;
}

export default RequestHandler