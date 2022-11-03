import { ProductDatabase } from '../database/ProductDatabase';
import { InternalError } from '../error/InternalError';
import { catchError } from './services/catchError';

const productDatabase = new ProductDatabase()

export class ProductBusiness {

	public async getAllProducts() {
		try {
			const result = await productDatabase.getAllFrom();

			if (!result.length) {
				throw new InternalError();
			}

			return result;

		} catch (error: any) {
			catchError(error)
		}
	}
    
}
