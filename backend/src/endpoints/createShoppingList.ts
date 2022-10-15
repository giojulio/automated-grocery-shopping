import { Request, Response } from 'express';
import { ProductDatabase } from '../database/ProductDatabase';
import { ShoppingListDatabase } from '../database/ShoppingListDatabase';
import { UserDatabase } from '../database/UserDatabase';
import { ListItem } from '../models/ListItem';
import { TItem } from '../models/types';
import { generateString } from '../services/generateString';
import { setMultipleStocks } from '../services/setMultipleStocks';

export const createShoppingList = async (req: Request, res: Response) => {
	let errorCode = 400;

	try {
		const user_id = req.body.user_id;
		const products: TItem[] = req.body.products;

		if (!products || !user_id) throw new Error('Please inform products IDs, user ID and desired quantities.');

		const id = user_id
		const verifyUser = await new UserDatabase().getById(id);

		if (!verifyUser.length) {
			errorCode = 404;
			throw new Error(`No user was identified.`);
		};

		const supplementedProducts = [];
		const quantities: number[] = [];
		const notAllowed = [];

		for (let i = 0; i < products.length; i++) {
			const item = await new ProductDatabase().getById(products[i].id);

			const checkEntry = await new ShoppingListDatabase().getDoubleEntry(user_id, item[0].id)

			if (item[0] && !checkEntry.length && products[i].desired_qty <= item[0].stock_qty) {

				supplementedProducts.push(item[0]);
				quantities.push(products[i].desired_qty);

			} else {
				notAllowed.push(item[0]);
			};
		};

		if (!supplementedProducts.length) throw new Error('Products failed verification.')

		const shoppingList = supplementedProducts.map((item, index) => {
			const listItem = new ListItem(
				generateString(),
				user_id,
				item.id,
				quantities[index]
			);

			return listItem;
		});

		const totalStock = supplementedProducts.map((item, index) => {
			return item.stock_qty - quantities[index];
		});

		await new ShoppingListDatabase().setNewObject(shoppingList).then(() => {
			setMultipleStocks(shoppingList, totalStock);
		});

		if (products.length !== supplementedProducts.length) {
			const productNames = notAllowed.map((item) => {
				return item.name;
			});

			res.status(201).send({ message: 'Shopping List order placed. Unauthorized products:', productNames: productNames });
		} else {
			res.status(201).send('Shopping List order placed.');
		};

	} catch (error: any) {
		res.status(errorCode).send(error.message);
	};
};
