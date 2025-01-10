import { Router } from "express"
import { ProductController } from "./controller"


export class ProductRoutes {

    static get routes():Router {
        const router = Router()
        const productController = new ProductController()
        
        // Definir las rutas
        router.get('/', productController.getProducts)
        
        return router
    }
}