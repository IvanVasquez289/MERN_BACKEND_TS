import { NextFunction, Request, Response } from "express";
import { Validators } from "../../config/validators";
import Project, { IProject } from "../../data/mongo/models/project.model";


declare global {
    namespace Express {
        interface Request {
            project: IProject
        }
    }
}

export async function validateProject(req: Request, res: Response, next: NextFunction) {
    
    try {
        const {projectId} = req.params
        if(!Validators.isMongoId(projectId)){
            res.status(400).json({error: 'Invalid id'})
            return
        }
        const project = await Project.findById(projectId)
    
        if(!project) {
            res.status(404).json({error: 'Project not found'})
            return
        }

        req.project = project
    } catch (error) {
        res.status(500).json({error: 'Internal server error'})
    }
    next()
}