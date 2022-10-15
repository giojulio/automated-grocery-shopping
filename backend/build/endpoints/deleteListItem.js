"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteListItem = void 0;
const ProductDatabase_1 = require("../database/ProductDatabase");
const ShoppingListDatabase_1 = require("../database/ShoppingListDatabase");
const deleteListItem = async (req, res) => {
    let errorCode = 400;
    try {
        const { item_id } = req.body;
        if (!item_id || typeof item_id !== 'string')
            throw new Error('Invalid item ID.');
        const verifyItem = await new ShoppingListDatabase_1.ShoppingListDatabase().getById(item_id);
        if (!verifyItem.length) {
            errorCode = 404;
            throw new Error('Item not found...');
        }
        ;
        const product = await new ProductDatabase_1.ProductDatabase().getById(verifyItem[0].product_id);
        const stockMath = product[0].stock_qty + verifyItem[0].desired_qty;
        await new ShoppingListDatabase_1.ShoppingListDatabase().deleteObject(item_id)
            .then(async () => {
            await new ProductDatabase_1.ProductDatabase().setNewValue(product[0].id, 'stock_qty', stockMath);
        });
        res.status(200).send('Item deleted!');
    }
    catch (error) {
        res.status(errorCode).send(error.message);
    }
    ;
};
exports.deleteListItem = deleteListItem;
//# sourceMappingURL=deleteListItem.js.map