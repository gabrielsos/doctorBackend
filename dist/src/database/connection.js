"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = __importDefault(require("knex"));
var db = knex_1.default({
    client: 'mysql',
    connection: {
        host: 'sql10.freemysqlhosting.net',
        user: 'sql10367042',
        password: process.env.APP_DB_PASSWORD,
        database: 'sql10367042'
    },
    useNullAsDefault: true,
});
exports.default = db;
