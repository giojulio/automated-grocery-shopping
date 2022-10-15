import { Request, Response } from "express";
import { UserDatabase } from "../database/UserDatabase";
import { generateString } from "../services/generateString";


export const createLogin = async (req: Request, res: Response) => {
    let errorCode = 400;

    try {
        const { email, password } = req.body;

        if (!email || !password) throw new Error('Missing login information.');

        const verifyUser = await new UserDatabase().getByEmail(email);

        if (!verifyUser.length) {
            errorCode = 404;
            throw new Error('E-mail not registered in our database.');
        };

        const checkPwd = verifyUser[0].password === password;

        if (checkPwd === false) {
            errorCode = 402;
            throw new Error('Incorrect password. Please, try again.');
        };

        const user_id = verifyUser[0].id;

        const token = generateString();

        res.status(200).send({ token: token, user_id: user_id });
    } catch (error: any) {
        res.status(errorCode).send(error.message);
    };
};