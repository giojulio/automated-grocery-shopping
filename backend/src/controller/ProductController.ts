import { Request, Response } from "express";
import { ProductBusiness } from "../business/ProductBusiness";

export class ProductController {
    getAllProducts = async (req: Request, res: Response) => {
        try {
            const products = await new ProductBusiness().getAllProducts()
    
            res.status(200).send({ products });
        } catch (error: any) {
            res.status(400).send(error.message || error.sqlMessage);
        };
    };
}