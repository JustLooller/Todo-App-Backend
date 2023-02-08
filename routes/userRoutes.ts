import {Router} from 'express';
import {UserController} from '../controller/UserController';


export class UserRoutes{
    router: Router;
    public userController: UserController= new UserController();

    constructor(){
        this.router= Router();
        this.routes();
    }

    routes(){
        this.router.post('/register', this.userController.signUp);
        this.router.post('/login', this.userController.signIn);
    }
}
