"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogin = void 0;
const UserDatabase_1 = require("../database/UserDatabase");
const generateString_1 = require("../services/generateString");
const createLogin = async (req, res) => {
    let errorCode = 400;
    try {
        const { email, password } = req.body;
        if (!email || !password)
            throw new Error('Missing login information.');
        const verifyUser = await new UserDatabase_1.UserDatabase().getByEmail(email);
        if (!verifyUser.length) {
            errorCode = 404;
            throw new Error('E-mail not registered in our database.');
        }
        ;
        const checkPwd = verifyUser[0].password === password;
        if (checkPwd === false) {
            errorCode = 402;
            throw new Error('Incorrect password. Please, try again.');
        }
        ;
        const user_id = verifyUser[0].id;
        const token = (0, generateString_1.generateString)();
        res.status(200).send({ token: token, user_id: user_id });
    }
    catch (error) {
        res.status(errorCode).send(error.message);
    }
    ;
};
exports.createLogin = createLogin;
//# sourceMappingURL=createLogin.js.map