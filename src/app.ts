import WebServer from "./server/WebServer";
import path from "path";
import * as fs from "fs";
import AppConfig from "./config/AppConfig";

const config = JSON.parse(fs.readFileSync(path.join(__dirname, './config/app.json')).toString())
let active = config.profile ? (config.profile.active ? config.profile.active : "dev") : "dev";
let defaultConfig = new AppConfig();
defaultConfig.config = {
    ...defaultConfig.config,
    ...config
}
try {
    const activeConfig = JSON.parse(fs.readFileSync(path.join(__dirname, `./config/app-${active}.json`)).toString())
    defaultConfig.config = {
        ...defaultConfig.config,
        ...config,
        ...activeConfig
    }
} catch (e) {
}
console.log("profile active is " + active)

let webServer = new WebServer(defaultConfig.config.server.host, defaultConfig.config.server.port);
webServer.start(defaultConfig);