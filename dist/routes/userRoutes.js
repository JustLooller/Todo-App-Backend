"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const UserController_1 = require("../controller/UserController");
class UserRoutes {
    constructor() {
        this.userController = new UserController_1.UserController();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post('/register', this.userController.signUp);
        this.router.post('/login', this.userController.signIn);
    }
}
exports.UserRoutes = UserRoutes;
