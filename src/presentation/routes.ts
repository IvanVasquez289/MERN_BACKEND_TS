import { Router } from "express";
import { ProjectRoutes } from "./product/routes";


export class AppRoutes {

    static get routes():Router {
        const router = Router()

        // Definir las rutas
        router.use('/api/products', ProjectRoutes.routes)
        return router
    }
}