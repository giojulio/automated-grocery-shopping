"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDatabase = void 0;
const knex_1 = __importDefault(require("knex"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class BaseDatabase {
    async getAllFrom() {
        const result = await BaseDatabase.connection(this.TABLE_NAME)
            .select();
        return result;
    }
    async getById(value) {
        const result = await BaseDatabase.connection(this.TABLE_NAME)
            .select()
            .where({ id: value });
        return result;
    }
    async setNewObject(object) {
        await BaseDatabase.connection(this.TABLE_NAME)
            .insert(object);
    }
    async setNewValue(id, column, value) {
        await BaseDatabase.connection(this.TABLE_NAME)
            .update(`${column}`, `${value}`)
            .where({ id });
    }
}
exports.BaseDatabase = BaseDatabase;
BaseDatabase.connection = (0, knex_1.default)({
    client: "mysql",
    connection: {
        host: process.env.DB_HOST,
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        multipleStatements: true
    },
});
;
//# sourceMappingURL=BaseDatabase.js.map