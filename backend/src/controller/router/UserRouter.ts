import express from 'express';
import { UserController } from '../UserController';

export const userRouter = express.Router();

const userController = new UserController();

userRouter.get('/profile/:id', userController.getUser);
userRouter.post('/login', userController.createLogin);
userRouter.post('/register', userController.createUser);