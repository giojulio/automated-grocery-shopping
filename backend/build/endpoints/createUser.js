"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const UserDatabase_1 = require("../database/UserDatabase");
const User_1 = require("../models/User");
const getAddress_1 = require("../services/getAddress");
const generateString_1 = require("../services/generateString");
const createUser = async (req, res) => {
    let errorCode = 400;
    try {
        const { name, zipcode, number, complement, day, email, password } = req.body;
        if (zipcode.includes('-') || zipcode.length > 8) {
            errorCode = 406;
            throw new Error("Zipcode must be only numbers.");
        }
        const address = await (0, getAddress_1.getAddress)(zipcode);
        if (!address)
            throw new Error('There is something whrong with zipcode information.');
        if (!name || !zipcode || !address.street || !address.neighborhood || !address.city || !address.state || !day || !email || !password) {
            throw new Error("Required fields must be filled.");
        }
        ;
        const verifyEmail = await new UserDatabase_1.UserDatabase().getByEmail(email);
        if (verifyEmail.length) {
            errorCode = 409;
            throw new Error('E-mail already registered in database');
        }
        ;
        const newUser = new User_1.User((0, generateString_1.generateString)(), name, zipcode, number ? number : 0, address.street, complement ? complement : 'N/A', address.neighborhood, address.city, address.state, day, email, password);
        await new UserDatabase_1.UserDatabase().setNewObject(newUser);
        res.status(201).send({ newUser: newUser });
    }
    catch (error) {
        res.status(errorCode).send(error.message);
    }
};
exports.createUser = createUser;
//# sourceMappingURL=createUser.js.map