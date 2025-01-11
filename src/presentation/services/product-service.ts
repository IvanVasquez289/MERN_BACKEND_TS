import { Request } from "express"
import { CustomError } from "../../domain/errors/custom.error"
import { CreateProjectDto } from "../../domain/dtos/create-project.dto"
import Project from "../../data/mongo/models/project.model"

export class ProductService {
    constructor() {}


    public getProducts = async () => {
        return 'obteniendo productos desde service'
    }

    public async createProduct (product: CreateProjectDto) {

        // const existingProduct = await Project.findOne({projectName: product.projectName})
        // if (existingProduct) {
        //     throw CustomError.badRequest('Product already exists')
        // }

        try {
            const newProduct = await Project.create(product)
            await newProduct.save()
            return newProduct
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }
}