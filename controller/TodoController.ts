import { Request, Response} from 'express';
import {AddTodo, DeleteTodo, UpdateTodo, GetTodos} from '../model/Model'

export class TodoController{

    public async AddTodo(req:Request, res: Response){
        const result= await AddTodo(req.body.title, req.body.user_Id, req.body.body);
        if(result === 1)
            return res.status(200).send({status:'success', message: 'Todo successfully added'});
        else 
            return res.send({status:'error', message: 'Something went wrong, try again'});
    }
    public async DeleteTodo(req:Request, res: Response){
        const result= await DeleteTodo(req.body.todo_Id);
        if(result === 1)
            return res.status(200).send({status:'success', message: 'Todo successfully deleted'});
        return res.send({status:'error', message: 'Something went wrong, try again'});
    }
    public async UpdateTodo(req:Request, res: Response){
        const result= await UpdateTodo(req.body.todo_Id, req.body?.title, req.body?.body);
        if(result === 1)
            return res.status(200).send({status:'success', message: 'Todo successfully updated'});
        return res.send({status:'error', message: 'Something went wrong, try again'});
    }
    public async GetTodos(req:Request, res: Response){
        const result= await GetTodos(req.body.user_id);
        if(typeof result !== null)
            return res.status(200).send(result);
        return res.send({status:'error', message: 'Something went wrong, try again'});
    }
}