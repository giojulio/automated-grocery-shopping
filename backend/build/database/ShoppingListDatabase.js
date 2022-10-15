"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingListDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class ShoppingListDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.TABLE_NAME = "Shp_Orders";
    }
    async getAllFrom() {
        return super.getAllFrom();
    }
    async getById(value) {
        return super.getById(value);
    }
    async setNewObject(object) {
        super.setNewObject(object);
    }
    async setNewValue(id, column, value) {
        super.setNewValue(id, column, value);
    }
    async getDoubleEntry(user_id, product_id) {
        const result = await BaseDatabase_1.BaseDatabase.connection(this.TABLE_NAME)
            .select()
            .where({ user_id: user_id })
            .andWhere({ product_id: product_id });
        return result;
    }
    async getListItemsById(user_id) {
        const result = await BaseDatabase_1.BaseDatabase.connection(this.TABLE_NAME)
            .join('Shp_Products', 'Shp_Orders.product_id', '=', 'Shp_Products.id')
            .select('Shp_Orders.id as order_id', 'Shp_Orders.user_id', 'Shp_Orders.product_id', 'Shp_Orders.desired_qty', 'Shp_Products.stock_qty', 'Shp_Products.price', 'Shp_Products.name')
            .where({ user_id: user_id });
        return result;
    }
    async getByProductId(product_id) {
        const result = await BaseDatabase_1.BaseDatabase.connection(this.TABLE_NAME)
            .select()
            .where({ product_id: product_id }).orderBy('product_id', 'asc');
        return result;
    }
    async deleteObject(id) {
        await BaseDatabase_1.BaseDatabase.connection(this.TABLE_NAME)
            .delete()
            .where({ id });
    }
}
exports.ShoppingListDatabase = ShoppingListDatabase;
//# sourceMappingURL=ShoppingListDatabase.js.map