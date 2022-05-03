export default class AppConfig {
    config = defaultConfig
}

const defaultConfig = {
    server: {
        host: "localhost",
        port: 80
    },
    web: {
        root: "/apps",
        static: {
            resource: {
                path: "/static/"
            }
        }
    }
}