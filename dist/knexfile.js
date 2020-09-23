"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
module.exports = {
    client: 'mysql',
    connection: {
        host: 'sql10.freemysqlhosting.net',
        user: 'sql10367042',
        password: process.env.APP_DB_PASSWORD,
        database: 'sql10367042'
    },
    migrations: {
        directory: path_1.default.resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true,
};
