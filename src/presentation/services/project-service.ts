import { Request } from "express"
import { CustomError } from "../../domain/errors/custom.error"
import Project from "../../data/mongo/models/project.model"
import { ProjectDataDto } from "../../domain/dtos/project/project-data.dto"

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

    public async createProject (project: ProjectDataDto) {

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

    public async updateProject (id: string, projectData: ProjectDataDto) {
        const existingProject = await Project.findById(id)
        if(!existingProject) throw CustomError.notFound('Project not found')

        try {
            const updatedProject = await Project.findByIdAndUpdate(id, projectData)  
            await updatedProject?.save()  
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    
    }
}