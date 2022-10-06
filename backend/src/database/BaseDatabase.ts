import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

export abstract class BaseDatabase {
	abstract TABLE_NAME: string		

	protected  static connection = knex ({
		client: "mysql",
   				connection: {
     					host: process.env.DB_HOST,
      					port:  3306,
      					user: process.env.DB_USER,
      					password: process.env.DB_PASSWORD,
      					database: process.env.DB_DATABASE,
      					multipleStatements: true
  		 		},
    })

	protected getById = async(id: any): Promise<any> => {
		const result = await BaseDatabase.connection(this.TABLE_NAME)
			.select()
			.where({id})

			return result
	}

	protected setNewValue = async(id: any, column: string, value: any): Promise<void> => {
		await BaseDatabase.connection(this.TABLE_NAME)
			.update({column: value})
			.where({id});
	}

	
};