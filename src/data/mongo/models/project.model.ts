import mongoose, { Document, PopulatedDoc } from "mongoose";
import { ITask } from "./task.model";

export interface IProject extends Document {
    projectName: string,
    clientName: string,
    description: string,
    tasks: PopulatedDoc<ITask & Document>[]
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
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }
    ]
},{
    timestamps: true
})

const Project = mongoose.model<IProject>('Project', ProyectSchema) 
export default Project