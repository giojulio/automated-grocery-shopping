import { BaseDatabase } from "./BaseDatabase"


export class ShoppingListDatabase extends BaseDatabase {
	TABLE_NAME = "Shp_Orders"

	public async getAllFrom() {
		return super.getAllFrom()
	}

	public async getById(value: any) {
		return super.getById(value)
	}

	public async setNewObject(object: any) {
		super.setNewObject(object)
	}

	public async setNewValue(id: any, column: string, value: any) {
		super.setNewValue(id, column, value)
	}

	// Individual Methods:
	public async getDoubleEntry(user_id: string, product_id: number) {
		const result = await BaseDatabase.connection(this.TABLE_NAME)
			.select()
			.where({ user_id: user_id })
			.andWhere({ product_id: product_id });

		return result
	}

	public async getListItemsById(user_id: string) {
		const result = await BaseDatabase.connection(this.TABLE_NAME)	
			.join('Shp_Products', 'Shp_Orders.product_id', '=', 'Shp_Products.id')
			.select('Shp_Orders.id as order_id', 'Shp_Orders.user_id', 'Shp_Orders.product_id', 'Shp_Orders.desired_qty', 'Shp_Products.stock_qty', 'Shp_Products.price', 'Shp_Products.name')
			.where({ user_id: user_id });

		return result
	}

	public async getByProductId (product_id: number){
			const result = await BaseDatabase.connection(this.TABLE_NAME)
				.select()
				.where({ product_id: product_id }).orderBy('product_id', 'asc')

			return result
	}

	public async deleteObject(id: string) {
		await BaseDatabase.connection(this.TABLE_NAME)
			.delete()
			.where({ id });
	}
}