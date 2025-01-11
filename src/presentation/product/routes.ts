import { Router } from "express"
import { ProjectController } from './controller';
import { ProductService } from "../services/project-service";


export class ProductRoutes {

    static get routes():Router {
        const router = Router()
        const projectService = new ProductService()
        const projectController = new ProjectController(projectService)
        
        // Definir las rutas
        router.get('/', projectController.getProjects)
        router.post('/', projectController.createProject)
        
        return router
    }
}