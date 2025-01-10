import mongoose from "mongoose";
import { ColorsAdapter } from "../../config/colors-adapter";


export class MongoDataBase {

    static async connect(mongoUrl: string) {
        try {
            await mongoose.connect(mongoUrl)
            const url = `${mongoose.connection.host}:${mongoose.connection.port}`
            ColorsAdapter.green('Connected to MongoDB')
            ColorsAdapter.cyan(`MongoDB URL: ${url}`)
        } catch (error) {
            ColorsAdapter.red('Error connecting to MongoDB')
            process.exit(1)
        }
    }
}