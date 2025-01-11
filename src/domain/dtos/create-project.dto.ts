
export class CreateProjectDto {

    private constructor(
        public projectName: string,
        public clientName: string,
        public description: string
    ){}

    static create(object: {[key: string]: any}): [string?, CreateProjectDto?] {
        const {projectName, clientName, description} = object;
        
        if(!projectName) return ['projectName is required', undefined]
        if(!clientName) return ['clientName is required', undefined]
        if(!description) return ['description is required', undefined]
        if(projectName.length < 3) return ['projectName must be at least 3 characters', undefined]
        
        return [undefined, new CreateProjectDto(projectName, clientName, description)]
    }   
}