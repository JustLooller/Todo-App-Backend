"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = require("./routes/userRoutes");
const todoRoutes_1 = require("./routes/todoRoutes");
dotenv_1.default.config();
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    routes() {
        this.app.use('/api/user', new userRoutes_1.UserRoutes().router);
        this.app.use('/api/todos', new todoRoutes_1.TodoRoutes().router);
    }
    config() {
        this.app.set('port', process.env.PORT);
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        this.app.use((0, cookie_parser_1.default)());
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server running on port' + this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
