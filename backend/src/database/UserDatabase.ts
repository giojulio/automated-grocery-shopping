import { IUser } from "../models/IUser"
import { BaseDatabase } from "./BaseDatabase"


export class UserDatabase extends BaseDatabase {
    TABLE_NAME = "Shopper_Users"

    public getById = async(id: string): Promise<IUser> => {
		return super.getById(id)
	}

}
