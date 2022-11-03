import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { LoginDTO } from "../models/LoginDTO";
import { RegistrationDTO } from "../models/RegistrationDTO";
import { authenticationData } from "../models/types";

const userBusiness = new UserBusiness();

export class UserController {
    public async createLogin (req: Request, res: Response){
        try {
            const { email, password } = req.body;
    
            const input: LoginDTO = {
                email, 
                password
            }
    
            const result = await userBusiness.createLogin(input)

            res.status(200).send({token: result.token, user_id: result.user_id});
        } catch (error: any) {
            res.status(400).send(error.message || error.sqlMessage);
        };
    }

    public async createUser (req: Request, res: Response) {
        try {
            const {
                name,
                zipcode,
                number,
                complement,
                day,
                email,
                password
            } = req.body;
    
            const input: RegistrationDTO = {
                name,
                zipcode,
                number,
                complement,
                day,
                email,
                password
            }
    
            const newUser = await userBusiness.createUser(input)
    
            res.status(201).send({ newUser });
        } catch (error: any) {
            res.status(400).send(error.message || error.sqlMessage);
        }
    }

    public async getUser (req: Request, res: Response){
        try {
            const id: authenticationData = req.params.id;
    
            const user = await userBusiness.getUser(id);
            
            res.status(200).send({ user });
        } catch (error: any) {
            res.status(400).send(error.message || error.sqlMessage);
        };
    };
}