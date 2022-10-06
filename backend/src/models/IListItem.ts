import { IItem } from "./Item";

export class IListItem extends IItem{
    constructor(
        id: string,
        name: string,
        price: number,
        private product_id: number,        
        private desired_qty: number
    ){
        super (
            id, 
            name,
            price,
        )
    }

    public getDesiredQty() {
        return this.desired_qty
    }

    getProductId() {
        return this.product_id
    }
};
