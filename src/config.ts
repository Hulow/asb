import path from "path"

require("dotenv").config({path: path.resolve(__dirname, "../.env")})

export interface Config {
    rabbitMQUri: string
}

export const config: Config = {
    rabbitMQUri: process.env.RABBIT_MQ_CONNECTION_URI!
};

