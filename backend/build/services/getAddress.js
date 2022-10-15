"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddress = void 0;
const axios_1 = __importDefault(require("axios"));
const getAddress = async (zipcode) => {
    try {
        const { data } = await axios_1.default.get(`https://viacep.com.br/ws/${zipcode}/json/`);
        const address = { street: data.logradouro, neighborhood: data.bairro, city: data.localidade, state: data.uf };
        return address;
    }
    catch (error) {
        throw new Error(error.message);
    }
    ;
};
exports.getAddress = getAddress;
//# sourceMappingURL=getAddress.js.map