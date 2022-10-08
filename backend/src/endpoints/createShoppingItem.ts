import { Request, Response } from "express";
import { stringify } from "querystring";
import { ProductDatabase } from "../database/ProductDatabase";
import { ShoppingListDatabase } from "../database/ShoppingListDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { IListItem } from "../models/IListItem";
import { TProduct } from "../models/types";
import {v4 as generateId} from 'uuid';

export const createListItem = async (req: Request, res: Response) => {
	let errorCode = 400;
	
    try {
		const {user_id}= req.body;
		const products: TProduct[] = req.body.products;
		if (!products || !user_id) throw new Error ("Please inform products IDs, user ID and desired quantities.");

		const verifyUser = await new UserDatabase().getById(user_id);
		
		const verifiedProducts = [];
		const quantities: number[] = [];
		for ( let i = 0; i < products.length; i++){
			const item = await new ProductDatabase().getById(products[i].id);

			if (item) {
				verifiedProducts.push(item) 
				quantities.push(products[i].desired_qty)
			};
		};

		const convertToLI = verifiedProducts.map((item, index)=>{
			const listItem = new IListItem(
				generateId(),
				item.getName(),
				item.getPrice(),
				item.getId(),
				user_id,
				quantities[index]
			);

			return listItem;
		});

		const totalStock = verifiedProducts.map((item, index) => {
			return item.getStock() - quantities[index];
		});

		if (!verifyUser || !verifiedProducts.length) {
			errorCode = 404;
			throw new Error(`Either user or any products were identified.`);

		} else if (products.length !== verifiedProducts.length) {
			const go = confirm(`There are some products in your request that aren't available. Do you wish to continue?`);

			switch (go) {
				case (false):
					errorCode = 501
					throw new Error ("Request cancelled.");

				case (true):
					await new ShoppingListDatabase().setNewObject(convertToLI)
						.then(() => {setMultiple(convertToLI, totalStock)});
					
					res.status(201).send("Shopping List order placed.");
				break;

				default:
					errorCode = 500
					throw new Error ("Something went wrong, please try again.");
			};
		};


		
					
	} catch (error: any) {
			res.status(errorCode).send(error.message);
	};
};


const setMultiple = async(items: any[], totalStock: number[]): Promise<void> => {
	

	for ( let i = 0; i < items.length; i++ ) {
		await new ProductDatabase()
			.setNewValue(items[i].getId(), "stock", totalStock[i])
	};
};
