import { Request, Response } from "express";
import { ProductDatabase } from "../database/ProductDatabase";
import { ShoppingListDatabase } from "../database/ShoppingListDatabase";

export const deleteListItem = async (req: Request, res: Response) => {
	let errorCode = 400;

	try {
		const { item_id } = req.body;

		if (!item_id || typeof item_id !== 'string') throw new Error('Invalid item ID.');

		const verifyItem = await new ShoppingListDatabase().getById(item_id);

		if (!verifyItem.length) {
			errorCode = 404;
			throw new Error('Item not found...');
		};

		const product = await new ProductDatabase().getById(verifyItem[0].product_id);

		const stockMath = product[0].stock_qty + verifyItem[0].desired_qty;

		await new ShoppingListDatabase().deleteObject(item_id)
			.then(async () => {
				await new ProductDatabase().setNewValue(product[0].id, 'stock_qty', stockMath)
			});

		res.status(200).send('Item deleted!');
	} catch (error: any) {
		res.status(errorCode).send(error.message);
	};
};