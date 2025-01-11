import { Request, Response } from "express";
import { ProductService } from "../services/product-service";
import { CustomError } from "../../domain/errors/custom.error";
import { CreateProjectDto } from "../../domain/dtos/create-project.dto";

export class ProductController {
    constructor(
        public readonly productService: ProductService
    ) {}

    private handleError = (error:any , res:Response) => {
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message})
        }

        return res.status(500).json({error: 'Internal server error'})
    }

    public getProducts = (req:Request, res: Response) => {
        this.productService.getProducts()
            .then(response => res.json(response))
            .catch(error => this.handleError(error, res))

    }

    createProduct = (req:Request, res: Response) => {
        const [error, createProductDto] = CreateProjectDto.create(req.body)
        if(error){
            res.status(400).json({error})
            return            
        }

        this.productService.createProduct(createProductDto!)
            .then(response => res.json(response))
            .catch(error => this.handleError(error, res))
    }

}