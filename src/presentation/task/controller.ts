import { Request, Response } from "express";
import { TaskService } from "../services/task-service";
import { CustomError } from "../../domain/errors/custom.error";
import { TaskDataDto } from "../../domain/dtos/task/task-data.dto";


export class TaskController {
    constructor(
        public readonly taskService: TaskService
    ) {}

    private handleError = (error:any , res:Response) => {
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message})
        }
    
        return res.status(500).json({error: 'Internal server error'})
    }


    public createTask = async (req: Request, res: Response) => {
        const [error, taskData] = TaskDataDto.create({
            ...req.body,
        })

        if(error) {
            res.status(400).json({error})
            return
        }

        this.taskService.createTask(req,taskData!)
            .then(response => res.json(response))
            .catch(error => this.handleError(error, res))
    }
}