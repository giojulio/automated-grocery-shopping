import { Request, Response } from 'express';
import { ShoppingListBusiness } from '../business/ShoppingListBusiness';
import { ListItemDTO } from '../models/ListItemDTO';
import { authenticationData, TItem } from '../models/types';

export class ShoppingListController {
	public async createShoppingItem (req: Request, res: Response) {
		try {
			const user_id = req.body.user_id;
			const product: TItem = req.body.product;
			
			const input: ListItemDTO = {
				user_id,
				product_id: product.id,
				desired_qty: product.desired_qty,
			};
	
			await new ShoppingListBusiness().createShoppingItem(input);

			res.status(201).send('Shopping List order placed.');
		} catch (error: any) {
			res.status(400).send(error.message || error.sqlMessage);
		};
	};
	
	
	public async alterShoppingList(req: Request, res: Response) {
		try {
			const { user_id } = req.body;
			const new_item: TItem = req.body.new_item;

			const input: ListItemDTO = {
				user_id,
				product_id: new_item.id,
				desired_qty: new_item.desired_qty,
			};

			await new ShoppingListBusiness().alterShoppingList(input);

			res.status(202).send(
				'Prouct quantity in item list successfully updated.'
			);
		} catch (error: any) {
			res.status(400).send(error.message || error.sqlMessage);
		}
	}

	public async getShoppingList(req: Request, res: Response) {
		try {
			const user_id: authenticationData = req.params.id;

			const shoppingList =
				await new ShoppingListBusiness().getShoppingList(user_id);

			res.status(200).send({ shoppingList });
		} catch (error: any) {
			res.status(400).send(error.message || error.sqlMessage);
		}
	}

	public async deleteListItem (req: Request, res: Response) {
		
		try {
			const  item_id: authenticationData = req.params.item_id;
			
			await new ShoppingListBusiness().deleteListItem(item_id)
	
			res.status(200).send('Item deleted!');
		} catch (error: any) {
			res.status(400).send(error.message || error.sqlMessage);
		};
	};
	public async deleteShoppingList (req: Request, res: Response) {
		try {
			const user_id: authenticationData  = req.params.user_id;

			const result = await new ShoppingListBusiness().deleteShoppingList(user_id)
				
			res.status(200).send(result);
			
		} catch (error: any) {
			res.status(400).send(error.message || error.sqlMessage);
		};
	};


}
