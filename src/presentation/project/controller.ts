import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { Validators } from "../../config/validators";
import { ProjectDataDto } from "../../domain/dtos/project/project-data.dto";
import { ProjectService } from "../services/project-service";

export class ProjectController {
    constructor(
        public readonly projectService: ProjectService
    ) {}

    private handleError = (error:any , res:Response) => {
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message})
        }

        return res.status(500).json({error: 'Internal server error'})
    }

    public getProjects = (req:Request, res: Response) => {
        this.projectService.getProjects()
            .then(response => res.json(response))
            .catch(error => this.handleError(error, res))

    }

    public getProjectById = (req:Request, res: Response)  => {
        const {id} = req.params
        if(!Validators.isMongoId(id)){
            res.status(400).json({error: 'Invalid id'})
            return
        }
        
        this.projectService.getProjectById(id)
            .then(response => res.json(response))
            .catch(error => this.handleError(error, res))
    }

    public createProject = (req:Request, res: Response) => {
        const [error, projectDataDto] = ProjectDataDto.create(req.body)
        if(error){
            res.status(400).json({error})
             
        }   

        this.projectService.createProject(projectDataDto!)
            .then(response => res.json(response))
            .catch(error => this.handleError(error, res))
    }

    public updateProject = (req:Request, res: Response) => {
        const {id} = req.params
        if(!Validators.isMongoId(id)){
            res.status(400).json({error: 'Invalid id'})
            return
        }

        const [error, projectDataDto] = ProjectDataDto.create(req.body)

        if(error){
            res.status(400).json({error})
            return       
        }

        this.projectService.updateProject(id, projectDataDto!)
            .then(response => res.status(201).json('Project updated'))
            .catch(error => this.handleError(error, res))
    }

    public deleteProject = (req:Request, res: Response) => {
        const {id} = req.params
        if(!Validators.isMongoId(id)){
            res.status(400).json({error: 'Invalid id'})
            return
        }
        
        this.projectService.deleteProject(id)
            .then(response => res.status(200).json('Project deleted'))
            .catch(error => this.handleError(error, res))
    }

}