import { ProductDatabase } from '../database/ProductDatabase';
import { ShoppingListDatabase } from '../database/ShoppingListDatabase';
import { UserDatabase } from '../database/UserDatabase';
import { MissingData } from '../error/MissingData';
import { Unauthorized } from '../error/Unauthorized';
import { NotModified } from '../error/NotModified';
import { ListItemDTO } from '../models/ListItemDTO';
import { authenticationData } from '../models/types';
import { NotSatisfiable } from '../error/NotSatisfiable';
import { ListItem } from '../models/ListItem';
import { generateString } from './services/generateString';
import { Verifications } from '../verification/Verifications';
import { catchError } from './services/catchError';

const userDatabase = new UserDatabase()
const shoppingListDatabase = new ShoppingListDatabase()
const productDatabase = new ProductDatabase()
const verify = new Verifications()

export class ShoppingListBusiness {

	public async createShoppingItem(input: ListItemDTO) {
		try {
			if (!input.product_id || !input.user_id) {
				throw new MissingData();
			}

			const id = input.user_id;
			const user = await userDatabase.getById(id);

			verify.verifyExistence(user)

			const product = await productDatabase.getById(input.product_id);

			verify.verifyExistence(product)

			const checkEntry = await shoppingListDatabase.getDoubleEntry(
				input.user_id,
				product[0].id
			);

			verify.verifyDoubleEntry(checkEntry)

			if (input.desired_qty > product[0].stock_qty) {
				throw new NotSatisfiable();
			}

			const listItem = new ListItem(
				generateString(),
				input.user_id,
				product[0].id,
				input.desired_qty
			);

			const stockMath = product[0].stock_qty - input.desired_qty;

			await shoppingListDatabase.setNewObject(listItem)
				.then(async () => { await productDatabase.setNewValue(
						product[0].id,
						'stock_qty',
						stockMath
					);
				});
		} catch (error: any) {
			catchError(error);
		}
	}

	public async alterShoppingList(input: ListItemDTO) {
		try {
			if (!input.user_id || !input.product_id || !input.desired_qty) {
				throw new MissingData();
			}

			const id = input.user_id;
			const user = await new UserDatabase().getById(id);

			verify.verifyExistence(user)

			const item = await new ShoppingListDatabase().getDoubleEntry(
				input.user_id,
				input.product_id
			);

			verify.verifyExistence(item)
			
			if (input.desired_qty === item[0].desired_qty) {
				throw new NotModified();
			}

			const product = await new ProductDatabase().getById(input.product_id);

			verify.verifyExistence(product)

			const stockMath =
				product[0].stock_qty +
				item[0].desired_qty -
				input.desired_qty;

			if (input.desired_qty > stockMath) {
				throw new Unauthorized();
			}

			await new ShoppingListDatabase()
				.setNewValue(item[0].id, 'desired_qty', input.desired_qty)
				.then(async () => {
					await productDatabase.setNewValue(
						product[0].id,
						'stock_qty',
						stockMath
					);
				});
		} catch (error: any) {
			catchError(error);
		}
	}

	public async getShoppingList(user_id: authenticationData) {
		try {
			if (!user_id) {
				throw new MissingData();
			}

			const user = await new UserDatabase().getById(user_id);

			verify.verifyExistence(user)

			const shoppingList = await shoppingListDatabase.getListItemsById(user_id);

			verify.verifyExistence(shoppingList)

			return shoppingList;
		} catch (error: any) {
			catchError(error)
		}
	}

	deleteListItem = async (item_id: string) => {
		try {
			if (!item_id) {
				throw new MissingData();
			}

			const item = await shoppingListDatabase.getById(item_id);

			verify.verifyExistence(item)

			const product = await productDatabase.getById(item[0].product_id);

			const stockMath = product[0].stock_qty + item[0].desired_qty;

			await shoppingListDatabase.deleteObject(item_id).then(async () => {
				await productDatabase.setNewValue(
					product[0].id,
					'stock_qty',
					stockMath
				);
			});
		} catch (error: any) {
			catchError(error);
		}
	};

	public async deleteShoppingList(user_id: authenticationData) {
		try {
			if (!user_id) {
				throw new MissingData();
			}

			const user = await userDatabase.getById(user_id);

			verify.verifyExistence(user)

			const items = await shoppingListDatabase.getListItemsById(user_id);

			const errorArray = [];

			for (let i = 0; i < items.length; i++) {
				const products = await productDatabase.getById(
					items[i].product_id
				);

				if (products.length) {
					const stockMath =
						products[0].stock_qty + items[i].desired_qty;

					await shoppingListDatabase.deleteObject(items[i].order_id)
						.then(async () => {
							await productDatabase.setNewValue(
								products[0].id,
								'stock_qty',
								stockMath
							);
						});
				} else {
					errorArray.push(items[i]);
				}
			}

			if (errorArray.length === items.length) {
				throw new NotModified();
			} else if (errorArray.length) {
				return { message: 'Partial success.', notDeleted: errorArray };
			} else {
				return { message: 'Shopping list deleted!' };
			}
		} catch (error: any) {
			catchError(error);
		}
	}
}
