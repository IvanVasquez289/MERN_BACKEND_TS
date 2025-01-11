
export class CustomError extends Error {
    private constructor(
        message: string,
        public readonly statusCode: number
    ){
        super(message)
    }

    static badRequest(message: string) {
        return new CustomError(message, 400)
    }
    
    static unathorized(message: string) {
        return new CustomError(message, 401)
    }

    static forbidden(message: string) {
        return new CustomError(message, 403)
    }

    static notFound(message: string) {
        return new CustomError(message, 404)
    }

    static internalServer(message: string) {
        return new CustomError(message, 500)
    }
}