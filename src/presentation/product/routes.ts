import { Router } from "express"
import { ProjectController } from './controller';
import { ProductService } from "../services/project-service";


export class ProjectRoutes {

    static get routes():Router {
        const router = Router()
        const projectService = new ProductService()
        const projectController = new ProjectController(projectService)
        
        // Definir las rutas
        router.get('/', projectController.getProjects)
        router.get('/:id', projectController.getProjectById)
        router.post('/', projectController.createProject)
        router.put('/:id', projectController.updateProject)
        router.delete('/:id', projectController.deleteProject)
        
        return router
    }
}