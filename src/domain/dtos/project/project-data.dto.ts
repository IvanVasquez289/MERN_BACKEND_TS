
export class ProjectDataDto {

    private constructor(
        public projectName: string,
        public clientName: string,
        public description: string
    ){}

    static create(object: {[key: string]: any}): [string?, ProjectDataDto?] {
        const {projectName, clientName, description} = object;
        
        if(!projectName || projectName.trim() === '') return ['projectName is required', undefined]
        if(!clientName || clientName.trim() === '') return ['clientName is required', undefined]
        if(!description || description.trim() === '') return ['description is required', undefined]
        if(projectName.length < 3) return ['projectName must be at least 3 characters', undefined]
        
        return [undefined, new ProjectDataDto(projectName, clientName, description)]
    }   
}