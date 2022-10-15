"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class ProductDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.TABLE_NAME = "Shp_Products";
    }
    async getAllFrom() {
        return super.getAllFrom();
    }
    async getById(value) {
        return super.getById(value);
    }
    async setNewValue(id, column, value) {
        super.setNewValue(id, column, value);
    }
}
exports.ProductDatabase = ProductDatabase;
//# sourceMappingURL=ProductDatabase.js.map