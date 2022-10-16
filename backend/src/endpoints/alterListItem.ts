import { Request, Response } from 'express';
import { ProductDatabase } from '../database/ProductDatabase';
import { ShoppingListDatabase } from '../database/ShoppingListDatabase';
import { UserDatabase } from '../database/UserDatabase';
import { TItem } from '../models/types';

export const alterShoppingList = async (req: Request, res: Response) => {
	let errorCode = 400;

	try {
		const { user_id } = req.body;
		const new_item: TItem = req.body.new_item;

		if (!user_id || !new_item) throw new Error('User ID or item missing.');

		const id = user_id;
		const verifyUser = await new UserDatabase().getById(id);

		if (!verifyUser.length) {
			errorCode = 404;
			throw new Error('No users registered under the provided ID.');
		};
		
		
		const verifyItem = await new ShoppingListDatabase().getByProductId(new_item.id);

		if (!verifyItem.length) {

			errorCode = 404;
			throw new Error("List item or product don't match database data. Please review request.");

		} else if (new_item.desired_qty === verifyItem[0].desired_qty) {

				errorCode = 411;
				throw new Error("Make sure changes were made.");
		};

		const product = await new ProductDatabase().getById(verifyItem[0].product_id);
		
		if (!product.length) {
				errorCode = 404;
				throw new Error("Product verification failed.");
		};

		const stockMath = product[0].stock_qty + verifyItem[0].desired_qty - new_item.desired_qty;

		if (new_item.desired_qty > stockMath) {
				errorCode = 404;
				throw new Error("Changes can't be supported due to stock quantity.");
		};

		await new ShoppingListDatabase()
			.setNewValue(verifyItem[0].id, 'desired_qty', new_item.desired_qty)
				.then(async () => {
					await new ProductDatabase().setNewValue(
						product[0].id,
						'stock_qty',
						stockMath
					);
				});
			
		
		res.status(202).send("Prouct quantity in item list successfully updated.");
	} catch (error: any) {
		res.status(errorCode).send(error.message);
	};
};
