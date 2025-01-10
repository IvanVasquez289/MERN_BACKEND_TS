import { Request, Response } from "express";

export class ProductController {
    constructor() {}

    public getProducts(req:Request, res: Response) {
        res.json('obteniendo productos')
    }
}