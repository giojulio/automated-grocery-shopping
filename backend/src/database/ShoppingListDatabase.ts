import { IListItem } from "../models/IListItem"
import { BaseDatabase } from "./BaseDatabase"


export class ShoppingListDatabase extends BaseDatabase {
    TABLE_NAME = "Shopper_ShoppingList"

    public getById = async(id: string): Promise<IListItem> => {
		return super.getById(id)
	}

    public setNewValue = async(id: any, column: string, value: any): Promise<void> => {
		super.setNewValue(id, column, value)
	}
}