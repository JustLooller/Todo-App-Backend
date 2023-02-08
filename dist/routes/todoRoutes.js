"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRoutes = void 0;
const express_1 = require("express");
const TodoController_1 = require("../controller/TodoController");
const AuthController_1 = require("../controller/AuthController");
class TodoRoutes {
    constructor() {
        this.todoController = new TodoController_1.TodoController();
        this.authController = new AuthController_1.AuthController();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get('/all', this.authController.verifyJwt, this.todoController.GetTodos);
        this.router.post('/add', this.authController.verifyJwt, this.todoController.AddTodo);
        this.router.post('/delete', this.authController.verifyJwt, this.todoController.DeleteTodo);
        this.router.post('/update', this.authController.verifyJwt, this.todoController.UpdateTodo);
    }
}
exports.TodoRoutes = TodoRoutes;
