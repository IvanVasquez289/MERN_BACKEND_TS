import { Request } from "express"
import { CustomError } from "../../domain/errors/custom.error"
import { CreateProjectDto } from "../../domain/dtos/create-project.dto"
import Project from "../../data/mongo/models/project.model"

export class ProductService {
    constructor() {}


    public getProjects = async () => {
        try {
            const projects = await Project.find({})
            return {
                projects
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    public getProjectById = async (id: string) => {
        try {
            const project = await Project.findById(id)
            if(!project) throw CustomError.notFound('Project not found jeje')
            return {
                project
            }
        } catch (error) {
            if(error instanceof Error) throw error
            throw CustomError.internalServer(`${error}`)
        }
        
    }

    public async createProject (project: CreateProjectDto) {

        // const existingProduct = await Project.findOne({projectName: product.projectName})
        // if (existingProduct) {
        //     throw CustomError.badRequest('Product already exists')
        // }

        try {
            const newProject = await Project.create(project)
            await newProject.save()
            return newProject
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }
}