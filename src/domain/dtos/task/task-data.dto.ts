import { Validators } from "../../../config/validators";
import { TaskStatus } from "../../../data/mongo/models/task.model";


export class TaskDataDto {
    private constructor(
        public readonly name: string,
        public readonly description: string,
    ){}

    static create(object: {[key: string]: any}): [string?, TaskDataDto?] {
        const {name, description} = object;
        
        if(!name || name.trim() === '') return ['name is required', undefined]
        if(!description || description.trim() === '') return ['description is required', undefined]
        
        return [undefined, new TaskDataDto(name, description)]
    }
}