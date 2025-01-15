import Project from "../../data/mongo/models/project.model"
import Task from "../../data/mongo/models/task.model"
import { CustomError } from "../../domain/errors/custom.error"
import { TaskDataDto } from '../../domain/dtos/task/task-data.dto';



export class TaskService {


    public createTask = async (task: TaskDataDto) => {
        const project = await Project.findById(task.project)
        if(!project) throw CustomError.notFound('Project not found')

        try {
            const newTask = await Task.create(task)
            project.tasks.push(newTask.id)

            await newTask.save()
            await project.save()
            
            return newTask
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }
}