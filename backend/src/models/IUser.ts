import { IListItem } from "./IListItem";

export class IUser {
    constructor(
        private name: string,
        private deliveryDate: Date,
        private shoppingList: IListItem[]
        // Maybe add address if time - services, BuscaCEP...
    ){}
};