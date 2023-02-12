import { Router } from "express";
import { UserController } from "../controller/UserController";

export class UserRoutes {
  router: Router;
  public userController: UserController = new UserController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    /**
     * @openapi
     * 
     *  /api/user/register:
     *  post:
     *      summary: Registers a user
     *      tags:
     *          - Users
     *      requestBody:
     *          required: true
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          username:
     *                              type: string
     *                              example: test
     *                          password:
     *                              type: string
     *                              example: myPassword
     *                          verifyPassword:
     *                              type: string
     *                              example: myPassword
     *      responses:
     *          200:
     *              description: Success, user succesfully created
     *              content: 
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              status:
     *                                  type: string
     *                                  example: Success
     *                              message:
     *                                  type: string
     *                                  example: user succesfully registered
     *          409:
     *              description: Error, user already registered
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              status:
     *                                  type: string
     *                                  example: Error
     *                              message:
     *                                  type: string
     *                                  example: user already registered
     *                                   
     */
    this.router.post("/register", this.userController.signUp);
    /**
     *@openapi
     * 
     * /api/user/login:
     *  post:
     *      summary: authenticates a user and sends a jwt token upon success
     *      tags:
     *          - Users
     *      requestBody:
     *          required: true
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          username:
     *                              type: string
     *                              example: test
     *                          password:
     *                              type: string
     *                              example: myPassword
     *
     *      responses:
     *          200:
     *              description: Success, user succesfully logged in
     *              content: 
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              status:
     *                                  type: string
     *                                  example: Success
     *                              message:
     *                                  type: string
     *                                  example: user succesfully registered
     *                              token:
     *                                  type: string
     *                                  example: myJwtToken
     *          401:
     *              description: Error, user not found
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              status:
     *                                  type: string
     *                                  example: Error
     *                              message:
     *                                  type: string
     *                                  example: user not found
     *                                   
     */
    this.router.post("/login", this.userController.signIn);
  }
}
