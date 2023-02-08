import { PrismaClient, Users, Todo } from '@prisma/client'
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()
const SALT_ROUNDS=10;


export async function login(usernameToLogin:string, passwordToLogin:string): Promise<number> {
    try{
        const hashPwd=bcrypt.hashSync(passwordToLogin, SALT_ROUNDS);

        const result=await(prisma.users.findMany({
            where:{
                    Username:usernameToLogin,      
            }
        }))
        if(result.length > 0) {
            let storedPassword=result[0].Password;
            if(bcrypt.compareSync(passwordToLogin, storedPassword))
                return 1;
        }
    }
    catch(err:any){
        console.log(err);
    }
    return -1;
    
}
export async function register(usernametoRegister:string, passwordtoRegister:string) : Promise<number>{
    try{
        const hashPwd=bcrypt.hashSync(passwordtoRegister, bcrypt.genSaltSync(SALT_ROUNDS));
        const alreadyRegistered=await(prisma.users.findMany({
            where:{
                Username:usernametoRegister
            }
        }))
        if (alreadyRegistered.length == 0){
            const result=await prisma.users.create({
                data: {
                    Username: usernametoRegister,
                    Password: hashPwd
                }
            })
            if (result)
                return 1;
        }
    }
    catch(err:any){
        console.log(err);
    }
    return -1;
}
export async function AddTodo(title: string, user_Id:number, body?:string) : Promise<number>{

    try{
        const result= await prisma.todo.create({
            data:{
                User_ID:user_Id,
                Title:title,
                Body:body,
                Create_Time: new Date(),
                Last_Update_Time: new Date()
            }
        })
        if (result)
            return 1;
    } catch(err :any){
        console.log(err);
    }
    return -1;
}
export async function DeleteTodo(todo_Id : number) : Promise<number>{
    try {
        const result:number = await prisma.$executeRaw`DELETE FROM Todo WHERE Todo_ID=${todo_Id}`
        console.log(result);
        if(result)
            return 1;
    } catch (err:any) {
        console.log(err);
    }
    return -1;


}
export async function UpdateTodo(todo_Id : number, title?:string, body?:string) : Promise <number>{
    try {
        const result = await prisma.todo.update({
            where:{
                Todo_ID:todo_Id
            },
            data:{
                Title:title,
                Body:body,
                Last_Update_Time:new Date()
            }
        })
        if(result)
            return 1;
    } catch (err:any) {
        console.log(err);
    }
    return -1;

}
export async function GetTodos(user_id:number): Promise<Todo[] | null> {

    try {
        const result= await prisma.todo.findMany({
            where:{
                User_ID:user_id
            }
        })
        return result ? result : null;
    } catch (err) {
        console.log(err);
    }
    return null;
}