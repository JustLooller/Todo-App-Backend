import { Request, Response} from 'express';
import {AddTodo, DeleteTodo, UpdateTodo, GetTodos, MoveTodoToBin, RecoverFromBin, MarkAsDone } from '../model/Model'

export class TodoController{

    public async AddTodo(req:Request, res: Response){
        const result= await AddTodo(req.body.title, req.body.username, req.body.body);
        if(result === 1)
            return res.status(200).send({status:'success', message: 'Todo successfully added'});
        else 
            return res.send({status:'error', message: 'Something went wrong while adding a todo, try again'});
    }
    public async DeleteTodo(req:Request, res: Response){
        const result= await DeleteTodo(req.body.todo_Id);
        if(result === 1)
            return res.status(200).send({status:'success', message: 'Todo successfully deleted'});
        return res.send({status:'error', message: 'Something went wrong while deleting the todo, try again'});
    }
    public async UpdateTodo(req:Request, res: Response){
        const result= await UpdateTodo(req.body.todo_Id, req.body?.title, req.body?.body);
        if(result === 1)
            return res.status(200).send({status:'success', message: 'Todo successfully updated'});
        return res.send({status:'error', message: 'Something went wrong while updating todos, try again'});
    }
    public async GetTodos(req:Request, res: Response){
        const result= await GetTodos(req.body.username);
        if(typeof result !== null)
            return res.status(200).send(result);
        return res.send({status:'error', message: 'Something went wrong while retrieving todos, try again'});
    }
    public async MoveToBin(req:Request, res: Response){
        const result= await MoveTodoToBin(req.body.todo_Id);
        if(result === 1)
            return res.status(200).send({status:'success', message: 'Todo successfully moved to bin'});
        return res.send({status:'error', message: 'Something went wrong while moving to bin, try again'});
    }
    public async RecoverFromBin(req:Request, res: Response){
        const result= await RecoverFromBin(req.body.todo_Id);
        if(result)
            return res.status(200).send({status:'success', message: 'Todo successfully recovered from bin'});
        return res.send({status:'error', message: 'Something went wrong during todo recovery, try again'});
        
    }
    public async MarkAsDone(req:Request, res: Response){
        const result= await MarkAsDone(req.body.todo_Id);
        if(result)
            return res.status(200).send({status:'success', message: 'Todo successfully marked as done'});
        return res.send({status:'error', message: 'Something went wrong while marking as done, try again'});
    }
}