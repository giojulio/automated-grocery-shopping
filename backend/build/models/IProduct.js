"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IProduct = void 0;
const IItem_1 = require("./IItem");
class IProduct extends IItem_1.IItem {
    constructor(id, name, price, stock_qty) {
        super(id, name, price);
        this.stock_qty = stock_qty;
    }
    getName() {
        return this.name;
    }
    getStock() {
        return this.stock_qty;
    }
}
exports.IProduct = IProduct;
;
//# sourceMappingURL=IProduct.js.map