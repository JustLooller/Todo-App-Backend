"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTodos = exports.UpdateTodo = exports.DeleteTodo = exports.AddTodo = exports.register = exports.login = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const SALT_ROUNDS = 10;
function login(usernameToLogin, passwordToLogin) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hashPwd = bcrypt_1.default.hashSync(passwordToLogin, SALT_ROUNDS);
            const result = yield (prisma.users.findMany({
                where: {
                    Username: usernameToLogin,
                }
            }));
            if (result.length > 0) {
                let storedPassword = result[0].Password;
                if (bcrypt_1.default.compareSync(passwordToLogin, storedPassword))
                    return 1;
            }
        }
        catch (err) {
            console.log(err);
        }
        return -1;
    });
}
exports.login = login;
function register(usernametoRegister, passwordtoRegister) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hashPwd = bcrypt_1.default.hashSync(passwordtoRegister, bcrypt_1.default.genSaltSync(SALT_ROUNDS));
            const alreadyRegistered = yield (prisma.users.findMany({
                where: {
                    Username: usernametoRegister
                }
            }));
            if (alreadyRegistered.length == 0) {
                const result = yield prisma.users.create({
                    data: {
                        Username: usernametoRegister,
                        Password: hashPwd
                    }
                });
                if (result)
                    return 1;
            }
        }
        catch (err) {
            console.log(err);
        }
        return -1;
    });
}
exports.register = register;
function AddTodo(title, user_Id, body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma.todo.create({
                data: {
                    User_ID: user_Id,
                    Title: title,
                    Body: body,
                    Create_Time: new Date(),
                    Last_Update_Time: new Date()
                }
            });
            if (result)
                return 1;
        }
        catch (err) {
            console.log(err);
        }
        return -1;
    });
}
exports.AddTodo = AddTodo;
function DeleteTodo(todo_Id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma.$executeRaw `DELETE FROM Todo WHERE Todo_ID=${todo_Id}`;
            console.log(result);
            if (result)
                return 1;
        }
        catch (err) {
            console.log(err);
        }
        return -1;
    });
}
exports.DeleteTodo = DeleteTodo;
function UpdateTodo(todo_Id, title, body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma.todo.update({
                where: {
                    Todo_ID: todo_Id
                },
                data: {
                    Title: title,
                    Body: body,
                    Last_Update_Time: new Date()
                }
            });
            if (result)
                return 1;
        }
        catch (err) {
            console.log(err);
        }
        return -1;
    });
}
exports.UpdateTodo = UpdateTodo;
function GetTodos(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma.todo.findMany({
                where: {
                    User_ID: user_id
                }
            });
            return result ? result : null;
        }
        catch (err) {
            console.log(err);
        }
        return null;
    });
}
exports.GetTodos = GetTodos;