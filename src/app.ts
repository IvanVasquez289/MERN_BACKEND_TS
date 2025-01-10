import { Server } from "./presentation/server"
import { AppRoutes } from "./presentation/routes"
import { envs } from "./config/envs"
import { MongoDataBase } from "./data/mongo"

(()=>{
    main()
})()

async function main(){

    await MongoDataBase.connect(envs.MONGO_URL)
    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    })

    server.start()
}