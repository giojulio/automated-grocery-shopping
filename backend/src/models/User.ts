export class User {
	constructor(
		protected id: string,
		private name: string,
		private zipcode: string,
		private number: number,
		private street: string,
		private complement: string,
		private neighborhood: string,
		private city: string,
		private state: string,
		private delivery_date: number,
		private email: string,
		private password: string,
	) { }
};