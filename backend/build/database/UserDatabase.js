"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class UserDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.TABLE_NAME = "Shp_Users";
    }
    async getById(value) {
        return super.getById(value);
    }
    async setNewObject(object) {
        super.setNewObject(object);
    }
    async getByEmail(mail) {
        const result = await BaseDatabase_1.BaseDatabase.connection(this.TABLE_NAME)
            .select().where({ email: mail });
        return result;
    }
}
exports.UserDatabase = UserDatabase;
//# sourceMappingURL=UserDatabase.js.map