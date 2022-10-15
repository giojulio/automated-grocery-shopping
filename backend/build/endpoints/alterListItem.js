"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alterListItem = void 0;
const ProductDatabase_1 = require("../database/ProductDatabase");
const ShoppingListDatabase_1 = require("../database/ShoppingListDatabase");
const alterListItem = async (req, res) => {
    let errorCode = 400;
    try {
        const item_id = req.params.id;
        const desired_qty = req.body.desired_qty;
        if (!item_id || !desired_qty)
            throw new Error("Please inform item ID and desired quantity");
        const verifyListItem = await new ShoppingListDatabase_1.ShoppingListDatabase().getById(item_id);
        if (!verifyListItem) {
            errorCode = 404;
            throw new Error("No list items registered under the provided ID.");
        }
        const verifyProduct = await new ProductDatabase_1.ProductDatabase().getById(verifyListItem.getProductId());
        if (!verifyProduct) {
            errorCode = 404;
            throw new Error("No products registered under this ID. Please contact support for help.");
        }
        else if (verifyProduct.getStock() < desired_qty) {
            errorCode = 412;
            throw new Error("The desired quantity of this product is not currently available in stock.");
        }
        else if (verifyListItem.getDesiredQty() === desired_qty) {
            errorCode = 406;
            throw new Error("No changes were detected.");
        }
        ;
        const newQtyStock = verifyProduct.getStock() - desired_qty;
        if (newQtyStock < 0) {
            errorCode = 406;
            throw new Error(`Your request exceeds the stock limit by ${newQtyStock * (-1)} items.`);
        }
        ;
        await new ShoppingListDatabase_1.ShoppingListDatabase().setNewValue(item_id, "desired_qty", desired_qty)
            .then(async () => await new ProductDatabase_1.ProductDatabase()
            .setNewValue(verifyListItem.getProductId(), "qty-stock", newQtyStock));
        res.status(202).send("Prouct quantity in item list successfully updated.");
    }
    catch (error) {
        res.status(errorCode).send(error.message);
    }
    ;
};
exports.alterListItem = alterListItem;
//# sourceMappingURL=alterListItem.js.map