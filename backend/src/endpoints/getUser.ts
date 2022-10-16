import { Request, Response } from "express";
import { UserDatabase } from "../database/UserDatabase";

export const getUser = async (req: Request, res: Response) => {
    let errorCode = 400;

    try {
        const id = req.params.id;

        if (!id) throw new Error("User ID needs to be declared.");

        const verifyUser = await new UserDatabase().getById(id);
        
        if (!verifyUser.length) {
            errorCode = 404;
            throw new Error("No users registered under the provided ID.");
        };

        res.status(200).send({ user: verifyUser[0] });
    } catch (error: any) {
        res.status(errorCode).send(error.message);
    };
};