import express from 'express';
import { ShoppingListController } from '../ShoppingListController';

export const shoppingListRouter = express.Router();

const shoppingListController = new ShoppingListController();

shoppingListRouter.get('/:id', shoppingListController.getShoppingList)
shoppingListRouter.post('/', shoppingListController.createShoppingItem);
shoppingListRouter.delete('/:user_id', shoppingListController.deleteShoppingList);
shoppingListRouter.delete('/edit/:item_id', shoppingListController.deleteListItem);
shoppingListRouter.put('/edit', shoppingListController.alterShoppingList);