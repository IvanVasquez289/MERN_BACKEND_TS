import Project from "../../data/mongo/models/project.model"
import Task from "../../data/mongo/models/task.model"
import { CustomError } from "../../domain/errors/custom.error"
import { TaskDataDto } from '../../domain/dtos/task/task-data.dto';
import { Request } from "express";



export class TaskService {


    public createTask = async (req:Request,task: TaskDataDto) => {
        const project = req.project
        try {
            const newTask = await Task.create(task)
            newTask.project = project.id
            project.tasks.push(newTask.id)

            // await newTask.save()
            // await project.save()

            await Promise.allSettled([newTask.save(), project.save()])
            return newTask
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }
}