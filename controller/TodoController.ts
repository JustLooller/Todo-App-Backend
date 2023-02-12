import { Request, Response } from "express";
import {
  AddTodo,
  DeleteTodo,
  UpdateTodo,
  GetTodos,
  MoveTodoToBin,
  RecoverFromBin,
  MarkAsDone,
  GetAllFromBin,
} from "../model/Model";

export class TodoController {
  public async AddTodo(req: Request, res: Response) {
    const result = await AddTodo(
      req.body.title,
      req.body.username,
      req.body.body
    );
    if (typeof result !== null)
      return res.status(200).send({
        status: "success",
        message: "Todo successfully added",
        data: result,
      });
    else
      return res.status(400).send({
        status: "error",
        message: "Something went wrong while adding a todo, try again",
      });
  }
  public async DeleteTodo(req: Request, res: Response) {
    const result = await DeleteTodo(req.body.todo_Id);
    if (typeof result !== null)
      return res.status(200).send({
        status: "success",
        message: "Todo successfully deleted",
        data: result,
      });
    return res.status(400).send({
      status: "error",
      message: "Something went wrong while deleting the todo, try again",
    });
  }
  public async UpdateTodo(req: Request, res: Response) {
    const result = await UpdateTodo(
      req.body.todo_Id,
      req.body?.title,
      req.body?.body
    );
    if (typeof result !== null)
      return res.status(200).send({
        status: "success",
        message: "Todo successfully updated",
        data: result,
      });
    return res.status(400).send({
      status: "error",
      message: "Something went wrong while updating todos, try again",
    });
  }
  public async GetTodos(req: Request, res: Response) {
    const username = req.query.username;
    const result = await GetTodos(username!.toString());
    if (typeof result !== null) return res.status(200).send(result);
    return res.status(400).send({
      status: "error",
      message: "Something went wrong while retrieving todos, try again",
    });
  }
  public async MoveToBin(req: Request, res: Response) {
    const result = await MoveTodoToBin(req.body.todo_Id);
    if (typeof result !== null)
      return res.status(200).send({
        status: "success",
        message: "Todo successfully moved to bin",
        data: result,
      });
    return res.status(400).send({
      status: "error",
      message: "Something went wrong while moving to bin, try again",
    });
  }
  public async RecoverFromBin(req: Request, res: Response) {
    const result = await RecoverFromBin(req.body.todo_Id);
    if (typeof result !== null)
      return res.status(200).send({
        status: "success",
        message: "Todo successfully recovered from bin",
        data: result,
      });
    return res.status(400).send({
      status: "error",
      message: "Something went wrong during todo recovery, try again",
    });
  }
  public async MarkAsDone(req: Request, res: Response) {
    const result = await MarkAsDone(req.body.todo_Id);
    if (typeof result !== null)
      return res.status(200).send({
        status: "success",
        message: "Todo successfully marked as done",
        data: result,
      });
    return res.status(400).send({
      status: "error",
      message: "Something went wrong while marking as done, try again",
    });
  }
  public async GetAllFromBin(req: Request, res: Response) {
    const username = req.query.username;
    const result = await GetAllFromBin(username!.toString());
    if (typeof result !== null)
      return res.status(200).send({ status: "success", data: result });
    return res.status(400).send({
      status: "error",
      message: "Something went wrong while getting todos from bin",
    });
  }
}
