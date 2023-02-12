import {Router} from 'express';
import {TodoController} from '../controller/TodoController';
import { AuthController } from '../controller/AuthController';


export class TodoRoutes{
    router: Router;
    public todoController: TodoController= new TodoController();
    public authController : AuthController= new AuthController();

    constructor(){
        this.router= Router();
        this.routes();
    }
    
    routes(){
        this.router.get('/all', this.authController.verifyJwt,this.todoController.GetTodos);
        this.router.post('/add', this.authController.verifyJwt, this.todoController.AddTodo);
        this.router.post('/delete', this.authController.verifyJwt, this.todoController.DeleteTodo);
        this.router.post('/update', this.authController.verifyJwt, this.todoController.UpdateTodo);
        this.router.post('/moveToBin', this.authController.verifyJwt, this.todoController.MoveToBin);
        this.router.post('/recoverFromBin', this.authController.verifyJwt, this.todoController.RecoverFromBin);
        this.router.post('/markAsDone', this.authController.verifyJwt, this.todoController.MarkAsDone);
        this.router.get('/getFromBin', this.authController.verifyJwt, this.todoController.GetAllFromBin);
    }
}
