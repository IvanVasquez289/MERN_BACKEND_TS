import mongoose, { Document } from "mongoose";

export enum TaskStatus {
    PENDING = 'PENDING',
    ON_HOLD = 'ON_HOLD',
    IN_PROGRESS = 'IN_PROGRESS',
    UNDER_REVIEW = 'IN_REVIEW',
    COMPLETED = 'COMPLETED'
}
export interface ITask extends Document {
    name: string,
    description: string,
    project: mongoose.Types.ObjectId,
    status: TaskStatus
}

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim : true
    },
    description: {
        type: String,
        required: true,
        trim : true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    status: {
        type: String,
        enum: Object.values(TaskStatus),
        default: TaskStatus.PENDING
    }
},{
    timestamps: true
})

const Task = mongoose.model<ITask>('Task', TaskSchema)
export default Task