import { IProduct } from "../models/IProduct"
import { BaseDatabase } from "./BaseDatabase"


export class ProductDatabase extends BaseDatabase {
    TABLE_NAME = "Shopper_Products"
    
    public getById = async(id: number): Promise<IProduct> => {
		return super.getById(id)
	}

    public setNewValue = async(id: any, column: string, value: any): Promise<void> => {
		super.setNewValue(id, column, value)
	}
}