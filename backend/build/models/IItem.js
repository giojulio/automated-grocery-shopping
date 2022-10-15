"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IItem = void 0;
class IItem {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
    getId() {
        return this.id;
    }
    getPrice() {
        return this.price;
    }
}
exports.IItem = IItem;
;
//# sourceMappingURL=IItem.js.map