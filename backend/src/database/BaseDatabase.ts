import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

export abstract class BaseDatabase {
	abstract TABLE_NAME: string

	protected static connection = knex({
		client: "mysql",
		connection: {
			host: process.env.DB_HOST,
			port: 3306,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			multipleStatements: true
		},
	})

	protected async getAllFrom() {
		const result = await BaseDatabase.connection(this.TABLE_NAME)
			.select();

		return result;
	}

	protected async getById(value: any) {
		const result = await BaseDatabase.connection(this.TABLE_NAME)
			.select()
			.where({ id: value });
			
		return result
	}

	protected async setNewObject(object: any) {
		await BaseDatabase.connection(this.TABLE_NAME)
			.insert(object);
	}

	protected async setNewValue(id: any, column: string, value: any) {
		await BaseDatabase.connection(this.TABLE_NAME)
			.update(`${column}`, `${value}`)
			.where({ id });
	}
};