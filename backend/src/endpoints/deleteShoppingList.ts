import { Request, Response } from "express";
import { ProductDatabase } from "../database/ProductDatabase";
import { ShoppingListDatabase } from "../database/ShoppingListDatabase";
import { UserDatabase } from "../database/UserDatabase";

export const deleteShoppingList = async (req: Request, res: Response) => {
    let errorCode = 400;

    try {
        const { user_id } = req.params;
       
        if (!user_id || typeof user_id !== 'string') throw new Error('Invalid user ID.');

        const verifyUser = await new UserDatabase().getById(user_id);
        
        if (!verifyUser.length) {
            errorCode = 404;
            throw new Error('User not found...');
        };

        const items = await new ShoppingListDatabase().getListItemsById(user_id);
        const errorArray = [];

        for (let i = 0; i < items.length; i++) {

            const products = await new ProductDatabase().getById(items[i].product_id);

            if (products.length) {

                const stockMath = products[0].stock_qty + items[i].desired_qty;
              
                await new ShoppingListDatabase().deleteObject(items[i].order_id)
                    .then(async () => {

                        await new ProductDatabase().setNewValue(products[0].id, 'stock_qty', stockMath);

                    });

            } else {
                errorArray.push(items[i]);
            };
        };

        if (errorArray.length === items.length) {
            errorCode = 500;
            throw new Error('No changes were made.');
        } else if (errorArray.length) {

            res.status(200).send({ message: 'Partial success.', notDeleted: errorArray });

        } else {

            res.status(200).send({message: 'Shopping list deleted!'});
        };
    } catch (error: any) {
        res.status(errorCode).send(error.message);
    };
};