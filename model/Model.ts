import { PrismaClient, Users, Todo } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

export async function login(
  usernameToLogin: string,
  passwordToLogin: string
): Promise<number> {
  try {
    const hashPwd = bcrypt.hashSync(passwordToLogin, SALT_ROUNDS);

    const result = await prisma.users.findMany({
      where: {
        Username: usernameToLogin,
      },
    });
    if (result.length > 0) {
      let storedPassword = result[0].Password;
      if (bcrypt.compareSync(passwordToLogin, storedPassword)) return 1;
    }
  } catch (err: any) {
    console.log(err);
  }
  return -1;
}
export async function register(
  usernametoRegister: string,
  passwordtoRegister: string
): Promise<number> {
  try {
    const hashPwd = bcrypt.hashSync(
      passwordtoRegister,
      bcrypt.genSaltSync(SALT_ROUNDS)
    );
    const alreadyRegistered = await prisma.users.findMany({
      where: {
        Username: usernametoRegister,
      },
    });
    if (alreadyRegistered.length == 0) {
      const result = await prisma.users.create({
        data: {
          Username: usernametoRegister,
          Password: hashPwd,
        },
      });
      if (result) return 1;
    }
  } catch (err: any) {
    console.log(err);
  }
  return -1;
}
export async function AddTodo(
  title: string,
  username: string,
  body?: string
): Promise<Todo | null> {
  try {
    const result = await prisma.todo.create({
      data: {
        Username: username,
        Title: title,
        Body: body,
        Create_Time: new Date(),
        Last_Update_Time: new Date(),
      },
    });
    if (typeof result !== null) return result;
  } catch (err: any) {
    console.log(err);
  }
  return null;
}
export async function DeleteTodo(todo_Id: number): Promise<number | null> {
  try {
    const result =
      await prisma.$executeRaw`DELETE  FROM Todo WHERE Todo_ID=${todo_Id}`;
    if (typeof result !== null) return result;
  } catch (err: any) {
    console.log(err);
  }
  return null;
}
export async function UpdateTodo(
  todo_Id: number,
  title?: string,
  body?: string
): Promise<Todo | null> {
  try {
    const result = await prisma.todo.update({
      where: {
        Todo_ID: todo_Id,
      },
      data: {
        Title: title,
        Body: body,
        Last_Update_Time: new Date(),
      },
    });
    if (typeof result !== null) return result;
  } catch (err: any) {
    console.log(err);
  }
  return null;
}
export async function GetTodos(username: string): Promise<unknown | null> {
  try {
    const result =
      await prisma.$queryRaw`SELECT * FROM Todo WHERE Username=${username} AND InRecycleBin=0`;
    if (typeof result !== null) return result;
  } catch (err) {
    console.log(err);
  }
  return null;
}
export async function MoveTodoToBin(todo_Id: number): Promise<Todo | null> {
  try {
    const result = await prisma.todo.update({
      where: {
        Todo_ID: todo_Id,
      },
      data: {
        InRecycleBin: 1,
      },
    });
    if (typeof result !== null) return result;
  } catch (err) {
    console.log(err);
  }
  return null;
}
export async function MarkAsDone(todo_Id: number): Promise<Todo | null> {
  try {
    const result = await prisma.todo.update({
      where: {
        Todo_ID: todo_Id,
      },
      data: {
        Status: 1,
      },
    });
    if (typeof result !== null) return result;
  } catch (err) {
    console.log(err);
  }
  return null;
}
export async function RecoverFromBin(todo_Id: number): Promise<Todo | null> {
  try {
    const result = await prisma.todo.update({
      where: {
        Todo_ID: todo_Id,
      },
      data: {
        InRecycleBin: 0,
      },
    });
    if (typeof result !== null) return result;
  } catch (err) {
    console.log(err);
  }
  return null;
}
export async function GetAllFromBin(username: string): Promise<unknown | null> {
  try {
    const result =
      await prisma.$queryRaw`SELECT * FROM Todo WHERE Username=${username} AND InRecycleBin=1`;
    if (typeof result !== null) return result;
  } catch (err) {
    console.log(err);
  }
  return null;
}
