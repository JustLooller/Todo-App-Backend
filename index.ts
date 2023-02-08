import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import {UserRoutes} from './routes/userRoutes'
import {TodoRoutes} from './routes/todoRoutes'

dotenv.config();

class Server{
    public app: express.Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    public routes():void{
        this.app.use('/api/user', new UserRoutes().router);
        this.app.use('/api/todos', new TodoRoutes().router);
    }

    public config():void{
        this.app.set('port', process.env.PORT);
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(cookieParser());
        
    }

    public start():void{
        this.app.listen(this.app.get('port'), () =>{
            console.log('Server running on port' + this.app.get('port'));
        })
    }
}

const server= new Server();

server.start();