export abstract class IItem {
    constructor( 
        protected id: any,
        protected name: string,
        protected price: number,
    ){}

    getPrice() {
        return this.price
    }

};