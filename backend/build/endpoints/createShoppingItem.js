"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createListItem = void 0;
const ProductDatabase_1 = require("../database/ProductDatabase");
const ShoppingListDatabase_1 = require("../database/ShoppingListDatabase");
const UserDatabase_1 = require("../database/UserDatabase");
const IListItem_1 = require("../models/IListItem");
const uuid_1 = require("uuid");
const createListItem = async (req, res) => {
    let errorCode = 400;
    try {
        const { user_id } = req.body;
        const products = req.body.products;
        if (!products || !user_id)
            throw new Error("Please inform products IDs, user ID and desired quantities.");
        const verifyUser = await new UserDatabase_1.UserDatabase().getById(user_id);
        const verifiedProducts = [];
        const quantities = [];
        for (let i = 0; i < products.length; i++) {
            const item = await new ProductDatabase_1.ProductDatabase().getById(products[i].id);
            if (item) {
                verifiedProducts.push(item);
                quantities.push(products[i].desired_qty);
            }
            ;
        }
        ;
        const convertToLI = verifiedProducts.map((item, index) => {
            const listItem = new IListItem_1.IListItem((0, uuid_1.v4)(), item.getName(), item.getPrice(), item.getId(), user_id, quantities[index]);
            return listItem;
        });
        const totalStock = verifiedProducts.map((item, index) => {
            return item.getStock() - quantities[index];
        });
        if (!verifyUser || !verifiedProducts.length) {
            errorCode = 404;
            throw new Error(`Either user or any products were identified.`);
        }
        else if (products.length !== verifiedProducts.length) {
            const go = confirm(`There are some products in your request that aren't available. Do you wish to continue?`);
            switch (go) {
                case (false):
                    errorCode = 501;
                    throw new Error("Request cancelled.");
                case (true):
                    await new ShoppingListDatabase_1.ShoppingListDatabase().setNewObject(convertToLI)
                        .then(() => { setMultiple(convertToLI, totalStock); });
                    res.status(201).send("Shopping List order placed.");
                    break;
                default:
                    errorCode = 500;
                    throw new Error("Something went wrong, please try again.");
            }
            ;
        }
        ;
    }
    catch (error) {
        res.status(errorCode).send(error.message);
    }
    ;
};
exports.createListItem = createListItem;
const setMultiple = async (items, totalStock) => {
    for (let i = 0; i < items.length; i++) {
        await new ProductDatabase_1.ProductDatabase()
            .setNewValue(items[i].getId(), "stock", totalStock[i]);
    }
    ;
};
//# sourceMappingURL=createShoppingItem.js.map