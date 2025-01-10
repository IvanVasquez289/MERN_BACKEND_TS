import express, { Router } from 'express';
import { ColorsAdapter } from '../config/colors-adapter';
interface Options {
    port: number;
    routes: Router;
}

export class Server {

    public readonly app = express()
    private serverListener?: any
    private readonly port: number;
    private readonly routes: Router

    constructor(options: Options) {
        const {port, routes} = options;
        this.port = port;
        this.routes = routes
    }

    async start() {
        // Middlewares
        this.app.use(express.json())
        this.app.use( express.urlencoded({ extended: true }) );

        // Routes
        this.app.use(this.routes)

        this.serverListener = this.app.listen(this.port, () => {
            ColorsAdapter.magenta(`Server running on port ${this.port}`)
        })
    }

    async stop() {
        this.serverListener?.close()
    }
}