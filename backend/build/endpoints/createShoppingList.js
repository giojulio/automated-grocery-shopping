"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShoppingList = void 0;
const ProductDatabase_1 = require("../database/ProductDatabase");
const ShoppingListDatabase_1 = require("../database/ShoppingListDatabase");
const UserDatabase_1 = require("../database/UserDatabase");
const ListItem_1 = require("../models/ListItem");
const generateString_1 = require("../services/generateString");
const setMultipleStocks_1 = require("../services/setMultipleStocks");
const createShoppingList = async (req, res) => {
    let errorCode = 400;
    try {
        const user_id = req.body.user_id;
        const products = req.body.products;
        if (!products || !user_id)
            throw new Error('Please inform products IDs, user ID and desired quantities.');
        const id = user_id;
        const verifyUser = await new UserDatabase_1.UserDatabase().getById(id);
        if (!verifyUser.length) {
            errorCode = 404;
            throw new Error(`No user was identified.`);
        }
        ;
        const supplementedProducts = [];
        const quantities = [];
        const notAllowed = [];
        for (let i = 0; i < products.length; i++) {
            const item = await new ProductDatabase_1.ProductDatabase().getById(products[i].id);
            const checkEntry = await new ShoppingListDatabase_1.ShoppingListDatabase().getDoubleEntry(user_id, item[0].id);
            if (item[0] && !checkEntry.length && products[i].desired_qty <= item[0].stock_qty) {
                supplementedProducts.push(item[0]);
                quantities.push(products[i].desired_qty);
            }
            else {
                notAllowed.push(item[0]);
            }
            ;
        }
        ;
        if (!supplementedProducts.length)
            throw new Error('Products failed verification.');
        const shoppingList = supplementedProducts.map((item, index) => {
            const listItem = new ListItem_1.ListItem((0, generateString_1.generateString)(), user_id, item.id, quantities[index]);
            return listItem;
        });
        const totalStock = supplementedProducts.map((item, index) => {
            return item.stock_qty - quantities[index];
        });
        await new ShoppingListDatabase_1.ShoppingListDatabase().setNewObject(shoppingList).then(() => {
            (0, setMultipleStocks_1.setMultipleStocks)(shoppingList, totalStock);
        });
        if (products.length !== supplementedProducts.length) {
            const productNames = notAllowed.map((item) => {
                return item.name;
            });
            res.status(201).send({ message: 'Shopping List order placed. Unauthorized products:', productNames: productNames });
        }
        else {
            res.status(201).send('Shopping List order placed.');
        }
        ;
    }
    catch (error) {
        res.status(errorCode).send(error.message);
    }
    ;
};
exports.createShoppingList = createShoppingList;
//# sourceMappingURL=createShoppingList.js.map