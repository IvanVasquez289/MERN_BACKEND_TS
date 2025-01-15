import { Validators } from "../../../config/validators";
import { TaskStatus } from "../../../data/mongo/models/task.model";


export class TaskDataDto {
    private constructor(
        public readonly name: string,
        public readonly description: string,
        public readonly project: string,
        public readonly status?: TaskStatus
    ){}

    static create(object: {[key: string]: any}): [string?, TaskDataDto?] {
        const {name, description, project, status} = object;
        
        if(!name || name.trim() === '') return ['name is required', undefined]
        if(!description || description.trim() === '') return ['description is required', undefined]

        if(!Validators.isMongoId(project)) return ['Invalid project id', undefined]
        
        return [undefined, new TaskDataDto(name, description, project, status)]
    }
}