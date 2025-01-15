import { Router } from "express"
import { ProjectController } from './controller';
import { TaskController } from "../task/controller";
import { TaskService } from "../services/task-service";
import { ProjectService } from "../services/project-service";
import { validateProject } from "../middlewares/validate-project";


export class ProjectRoutes {

    static get routes():Router {
        const router = Router()
        const projectService = new ProjectService()
        const projectController = new ProjectController(projectService)

        // task controller and service
        const taskService = new TaskService()
        const taskController = new TaskController(taskService)
        
        // Definir las rutas
        router.get('/', projectController.getProjects)
        router.get('/:id', projectController.getProjectById)
        router.post('/', projectController.createProject)
        router.put('/:id', projectController.updateProject)
        router.delete('/:id', projectController.deleteProject)

        // Rutas para tareas
        router.post('/:projectId/tasks',[validateProject] ,taskController.createTask)
        
        return router
    }
}