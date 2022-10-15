"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShoppingList = void 0;
const ShoppingListDatabase_1 = require("../database/ShoppingListDatabase");
const UserDatabase_1 = require("../database/UserDatabase");
const getShoppingList = async (req, res) => {
    let errorCode = 400;
    try {
        const user_id = req.params.id;
        if (!user_id)
            throw new Error("User needs to be declared.");
        const verifyUser = await new UserDatabase_1.UserDatabase().getById(user_id);
        if (!verifyUser.length) {
            errorCode = 404;
            throw new Error("No users registered under the provided ID.");
        }
        ;
        const shoppingList = await new ShoppingListDatabase_1.ShoppingListDatabase().getListItemsById(user_id);
        if (!shoppingList.length) {
            errorCode = 404;
            throw new Error("This user still hasn't placed an order");
        }
        ;
        res.status(200).send({ shoppingList: shoppingList });
    }
    catch (error) {
        res.status(errorCode).send(error.message);
    }
    ;
};
exports.getShoppingList = getShoppingList;
//# sourceMappingURL=getShoppingList.js.map