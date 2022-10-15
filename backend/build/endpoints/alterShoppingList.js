"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alterShoppingList = void 0;
const ProductDatabase_1 = require("../database/ProductDatabase");
const ShoppingListDatabase_1 = require("../database/ShoppingListDatabase");
const data_1 = require("../database/sql/data");
const UserDatabase_1 = require("../database/UserDatabase");
const alterShoppingList = async (req, res) => {
    let errorCode = 400;
    try {
        const { user_id } = req.body;
        const new_items = req.body.new_items;
        if (!user_id || !new_items.length)
            throw new Error('User ID or items missing.');
        const id = user_id;
        const verifyUser = await new UserDatabase_1.UserDatabase().getById(id);
        if (!verifyUser.length) {
            errorCode = 404;
            throw new Error('No users registered under the provided ID.');
        }
        ;
        const verifiedItems = [];
        for (let i = 0; i < new_items.length; i++) {
            const item = await new ShoppingListDatabase_1.ShoppingListDatabase().getByProductId(new_items[i].id);
            if (!item.length) {
                errorCode = 404;
                throw new Error("List item or product don't match database data. Please review request.");
            }
            else if (new_items[i].desired_qty === item[0].desired_qty) {
                errorCode = 411;
                throw new Error("Make sure changes were made.");
            }
            verifiedItems.push(item[0]);
        }
        const formatNewItems = new_items.sort(({ id: a }, { id: b }) => a - b);
        for (let i = 0; i < verifiedItems.length; i++) {
            const product = await new ProductDatabase_1.ProductDatabase().getById(verifiedItems[i].product_id);
            const stockMath = product[0].stock_qty + verifiedItems[i].desired_qty - formatNewItems[i].desired_qty;
            if (!data_1.products.length) {
                errorCode = 404;
                throw new Error("Product verification failed.");
            }
            else if (verifiedItems[i].desired_qty > stockMath) {
                errorCode = 404;
                throw new Error("Changes can't be supported due to stock quantity.");
            }
            else {
                await new ShoppingListDatabase_1.ShoppingListDatabase()
                    .setNewValue(verifiedItems[i].id, 'desired_qty', formatNewItems[i].desired_qty)
                    .then(async () => {
                    await new ProductDatabase_1.ProductDatabase().setNewValue(product[0].id, 'stock_qty', stockMath);
                });
            }
            ;
        }
        ;
        res.status(202).send("Prouct quantity in item list successfully updated.");
    }
    catch (error) {
        res.status(errorCode).send(error.message);
    }
    ;
};
exports.alterShoppingList = alterShoppingList;
//# sourceMappingURL=alterShoppingList.js.map