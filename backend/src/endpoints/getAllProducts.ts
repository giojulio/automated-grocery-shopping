import { Request, Response } from "express";
import { ProductDatabase } from "../database/ProductDatabase";

export const getAllProducts = async (req: Request, res: Response) => {
	let errorCode = 400;

	try {
		const products = await new ProductDatabase().getAllFrom()

		if (!products.length) {
			errorCode = 500;
			throw new Error("Sorry, something went wrong with your request. Try again later.");
		};

		res.status(200).send({ products: products });
	} catch (error: any) {
		res.status(errorCode).send(error.message);
	};
};