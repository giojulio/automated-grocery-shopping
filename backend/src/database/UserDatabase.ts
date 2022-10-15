import { BaseDatabase } from "./BaseDatabase"


export class UserDatabase extends BaseDatabase {
  TABLE_NAME = "Shp_Users"

  public async getById(value: any) {
    return super.getById(value)
  }

  public async setNewObject(object: any) {
    super.setNewObject(object)
  }

  // Individual Methods:
  public async getByEmail(mail: string) {
    const result = await BaseDatabase.connection(this.TABLE_NAME)
      .select().where({ email: mail });

    return result
  }
}
