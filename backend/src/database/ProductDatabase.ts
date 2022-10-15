import { BaseDatabase } from "./BaseDatabase"


export class ProductDatabase extends BaseDatabase {
	TABLE_NAME = "Shp_Products"

	public async getAllFrom() {
		return super.getAllFrom()
	}

	public async getById(value: any) {
		return super.getById(value)
	}

	public async setNewValue(id: any, column: string, value: any) {
		super.setNewValue(id, column, value)
	}
}