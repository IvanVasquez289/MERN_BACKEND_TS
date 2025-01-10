import mongoose from "mongoose";

export type ProjectType = {
    projectName: string,
    clientName: string,
    description: string
}

const ProyectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
        trim : true
    },
    clientName: {
        type: String,
        required: true,
        trim : true
    },
    description: {
        type: String,
        required: true,
        trim : true
    }
})

const Project = mongoose.model<ProjectType>('Project', ProyectSchema) 
export default Project