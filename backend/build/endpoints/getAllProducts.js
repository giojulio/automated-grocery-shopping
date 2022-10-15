"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = void 0;
const ProductDatabase_1 = require("../database/ProductDatabase");
const getAllProducts = async (req, res) => {
    let errorCode = 400;
    try {
        const products = await new ProductDatabase_1.ProductDatabase().getAllFrom();
        if (!products.length) {
            errorCode = 500;
            throw new Error("Sorry, something went wrong with your request. Try again later.");
        }
        ;
        res.status(200).send({ products: products });
    }
    catch (error) {
        res.status(errorCode).send(error.message);
    }
    ;
};
exports.getAllProducts = getAllProducts;
//# sourceMappingURL=getAllProducts.js.map