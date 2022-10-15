"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMultipleStocks = void 0;
const ProductDatabase_1 = require("../database/ProductDatabase");
const setMultipleStocks = async (items, totalStock) => {
    try {
        for (let i = 0; i < items.length; i++) {
            await new ProductDatabase_1.ProductDatabase()
                .setNewValue(items[i].product_id, "stock_qty", totalStock[i]);
        }
        ;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.setMultipleStocks = setMultipleStocks;
//# sourceMappingURL=setMultipleStocks.js.map