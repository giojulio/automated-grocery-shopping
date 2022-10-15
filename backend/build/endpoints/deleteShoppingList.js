"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteShoppingList = void 0;
const ProductDatabase_1 = require("../database/ProductDatabase");
const ShoppingListDatabase_1 = require("../database/ShoppingListDatabase");
const UserDatabase_1 = require("../database/UserDatabase");
const deleteShoppingList = async (req, res) => {
    let errorCode = 400;
    try {
        const { user_id } = req.body;
        if (!user_id || typeof user_id !== 'string')
            throw new Error('Invalid user ID.');
        const verifyUser = await new UserDatabase_1.UserDatabase().getById(user_id);
        if (!verifyUser.length) {
            errorCode = 404;
            throw new Error('User not found...');
        }
        ;
        const items = await new ShoppingListDatabase_1.ShoppingListDatabase().getListItemsById(user_id);
        const errorArray = [];
        for (let i = 0; i < items.length; i++) {
            const products = await new ProductDatabase_1.ProductDatabase().getById(items[i].product_id);
            if (products.length) {
                const stockMath = products[0].stock_qty + items[i].desired_qty;
                await new ShoppingListDatabase_1.ShoppingListDatabase().deleteObject(items[i].id)
                    .then(async () => {
                    await new ProductDatabase_1.ProductDatabase().setNewValue(products[0].id, 'stock_qty', stockMath);
                });
            }
            else {
                errorArray.push(items[i]);
            }
            ;
        }
        ;
        if (errorArray.length === items.length) {
            errorCode = 500;
            throw new Error('No changes were made.');
        }
        else if (errorArray.length) {
            res.status(200).send({ message: 'Partial success.', notDeleted: errorArray });
        }
        else {
            res.status(200).send('Shopping list deleted!');
        }
        ;
    }
    catch (error) {
        res.status(errorCode).send(error.message);
    }
    ;
};
exports.deleteShoppingList = deleteShoppingList;
//# sourceMappingURL=deleteShoppingList.js.map