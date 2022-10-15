"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = void 0;
const ProductDatabase_1 = require("../database/ProductDatabase");
const getProductById = async (req, res) => {
    let errorCode = 400;
    try {
        const ids = req.body.ids;
        if (!ids.length)
            throw new Error("You must inform products IDs.");
        const products = [];
        for (let i = 0; i < ids.length; i++) {
            const item = await new ProductDatabase_1.ProductDatabase().getById(ids[i]);
            if (item[0].length) {
                products.push(item[0]);
            }
        }
        if (!products.length) {
            throw new Error('No products found under the provided IDs.');
        }
        res.status(200).send({ products: products });
    }
    catch (error) {
        res.status(errorCode).send(error.message);
    }
    ;
};
exports.getProductById = getProductById;
//# sourceMappingURL=getProductById.js.map