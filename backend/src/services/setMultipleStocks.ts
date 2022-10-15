import { ProductDatabase } from "../database/ProductDatabase";

export const setMultipleStocks = async (items: any[], totalStock: number[]): Promise<void> => {
	try {
		
		for (let i = 0; i < items.length; i++) {
			await new ProductDatabase()
				.setNewValue(items[i].product_id, "stock_qty", totalStock[i]);
		};

	} catch (error) {
		throw new Error(error.message)
	}
};