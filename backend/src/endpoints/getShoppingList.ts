import { Request, Response } from "express";
import { ShoppingListDatabase } from "../database/ShoppingListDatabase";
import { UserDatabase } from "../database/UserDatabase";

export const getShoppingList = async (req: Request, res: Response) => {
    let errorCode = 400;

    try {
        const user_id = req.params.id;

        if (!user_id) throw new Error("User needs to be declared.");

        const verifyUser = await new UserDatabase().getById(user_id);

        if (!verifyUser.length) {
            errorCode = 404;
            throw new Error("No users registered under the provided ID.");
        };

        const shoppingList = await new ShoppingListDatabase().getListItemsById(user_id);

        if (!shoppingList.length) {
            errorCode = 404;
            throw new Error("This user still hasn't placed an order");
        };

        res.status(200).send({ shoppingList: shoppingList });
    } catch (error: any) {
        res.status(errorCode).send(error.message);
    };
};