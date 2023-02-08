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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const Model_1 = require("../model/Model");
class TodoController {
    AddTodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, Model_1.AddTodo)(req.body.title, req.body.user_Id, req.body.body);
            if (result === 1)
                return res.status(200).send({ status: 'success', message: 'Todo successfully added' });
            else
                return res.send({ status: 'error', message: 'Something went wrong, try again' });
        });
    }
    DeleteTodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, Model_1.DeleteTodo)(req.body.todo_Id);
            if (result === 1)
                return res.status(200).send({ status: 'success', message: 'Todo successfully deleted' });
            return res.send({ status: 'error', message: 'Something went wrong, try again' });
        });
    }
    UpdateTodo(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, Model_1.UpdateTodo)(req.body.todo_Id, (_a = req.body) === null || _a === void 0 ? void 0 : _a.title, (_b = req.body) === null || _b === void 0 ? void 0 : _b.body);
            if (result === 1)
                return res.status(200).send({ status: 'success', message: 'Todo successfully updated' });
            return res.send({ status: 'error', message: 'Something went wrong, try again' });
        });
    }
    GetTodos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, Model_1.GetTodos)(req.body.user_id);
            if (typeof result !== null)
                return res.status(200).send(result);
            return res.send({ status: 'error', message: 'Something went wrong, try again' });
        });
    }
}
exports.TodoController = TodoController;
