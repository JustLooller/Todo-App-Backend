import { Router } from "express";
import { TodoController } from "../controller/TodoController";
import { AuthController } from "../controller/AuthController";

export class TodoRoutes {
  router: Router;
  public todoController: TodoController = new TodoController();
  public authController: AuthController = new AuthController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    /**
     * @openapi
     *
     *  /api/todos/all:
     *  get:
     *      summary: Retrieves all todos not in the recycle bin for a user
     *      tags:
     *          - Todos
     *      security:
     *          - BearerAuthentication: []
     *      parameters:
     *          - in: query
     *            name: username
     *            schema:
     *              type: string
     *              description: the user whose todos we want to get
     *      responses:
     *          200:
     *              description: Success, todos retrieved
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              Todo_ID:
     *                                  type: number
     *                                  example: 1
     *                              Username:
     *                                  type: string
     *                                  example: myUsername
     *                              Title:
     *                                  type: string
     *                                  example: Title
     *                              Body:
     *                                  type: string
     *                                  example: Body
     *                              Create_Time:
     *                                  type: Date
     *                                  example: 2023/01/01T00:00:00Z
     *                              Last_Update_Time:
     *                                  type: Date
     *                                  example: 2023/01/01T00:00:00Z
     *                              Status:
     *                                  type: number
     *                                  example: 0
     *                              InRecycleBin:
     *                                  type: number
     *                                  example: 0
     *
     *          400:
     *              description: Error
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
     *                                  example: something went wrong while retrieving the todos
     *
     */
    this.router.get(
      "/all",
      this.authController.verifyJwt,
      this.todoController.GetTodos
    );
    /**
     *@openapi
     *
     *  /api/todos/getFromBin:
     *  get:
     *      summary: Retrieves all todos in the recycle bin for a user
     *      tags:
     *          - Todos
     *      security:
     *          - BearerAuthentication: []
     *      parameters:
     *          - in: query
     *            name: username
     *            schema:
     *              type: string
     *              description: the user whose todos we want to get
     *      responses:
     *          200:
     *              description: Success, todos retrieved
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              Todo_ID:
     *                                  type: number
     *                                  example: 1
     *                              Username:
     *                                  type: string
     *                                  example: myUsername
     *                              Title:
     *                                  type: string
     *                                  example: Title
     *                              Body:
     *                                  type: string
     *                                  example: Body
     *                              Create_Time:
     *                                  type: Date
     *                                  example: 2023/01/01T00:00:00Z
     *                              Last_Update_Time:
     *                                  type: Date
     *                                  example: 2023/01/01T00:00:00Z
     *                              Status:
     *                                  type: number
     *                                  example: 0
     *                              InRecycleBin:
     *                                  type: number
     *                                  example: 1
     *
     *          400:
     *              description: Error
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
     *                                  example: something went wrong while retrieving the todos
     *
     */
    this.router.get(
      "/getFromBin",
      this.authController.verifyJwt,
      this.todoController.GetAllFromBin
    );
    /**
     *@openapi
     {
  "/api/todos/add": {
    "post": {
      "summary": "Adds a todo",
      "tags": [
        "Todos"
      ],
      security: [
      {
        BearerAuthentication: [],
      },
    ],
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "title": {
                  "type": "string",
                  "example": "newTitle"
                },
                "username": {
                  "type": "string",
                  "example": "myUsername"
                },
                "body": {
                  "type": "string",
                  "example": "newBody"
                }
              }
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "Success, todos retrieved",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                    "example": "success"
                  },
                  "message": {
                    "type": "string",
                    "example": "todo successfully added"
                  },
                  "data": {
                    "type": "object",
                    "properties": {
                      "Todo_ID": {
                        "type": "number",
                        "example": 1
                      },
                      "Username": {
                        "type": "string",
                        "example": "myUsername"
                      },
                      "Title": {
                        "type": "string",
                        "example": "MyTitle"
                      },
                      "Body": {
                        "type": "string",
                        "example": "MyBody"
                      },
                      "Create_Time": {
                        "type": "Date",
                        "example": 2023/01/01T00:00:00Z
                      },
                      "Last_Update_Time": {
                        "type": "DateTime",
                        "example": 2023/01/01T00:00:00Z
                      },
                      "Status": {
                        "type": "number",
                        "example": 0
                      },
                      "InRecycleBin": {
                        "type": "number",
                        "example": 1
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "400": {
          "description": "Error",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                    "example": "Error"
                  },
                  "message": {
                    "type": "string",
                    "example": "something went wrong while adding a todo"
                  }
                }
              }
            }
          }
        },
        "401": {
          "description": "Unauthorized",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                    "example": "error"
                  },
                  "message": {
                    "type": "string",
                    "example": "unauthorized"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
     */
    this.router.post(
      "/add",
      this.authController.verifyJwt,
      this.todoController.AddTodo
    );
    /**
     * @openapi
    {
  "/api/todos/delete": {
    "post": {
      "summary": "Deletes a todo",
      "tags": [
        "Todos"
      ],
      security: [
      {
        BearerAuthentication: [],
      },
    ],
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "Todo_ID": {
                  "type": "number",
                  "example": 1
                },
              }
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "Success, todo deleted",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                    "example": "success"
                  },
                  "message": {
                    "type": "string",
                    "example": "todo successfully deleted"
                  },
                  "data": {
                    "type" : "number",
                    "example" : 1
                  }
                }
              }
            }
          }
        },
        "400": {
          "description": "Error",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                    "example": "Error"
                  },
                  "message": {
                    "type": "string",
                    "example": "something went wrong while deleting a todo"
                  }
                }
              }
            }
          }
        },
        "401": {
          "description": "Unauthorized",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                    "example": "error"
                  },
                  "message": {
                    "type": "string",
                    "example": "unauthorized"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
     */
    this.router.post(
      "/delete",
      this.authController.verifyJwt,
      this.todoController.DeleteTodo
    );
    /**
     * @openapi
    {
  "/api/todos/update": {
    "post": {
      "summary": "Updates a todo",
      "tags": [
        "Todos"
      ],
      security: [
      {
        BearerAuthentication: [],
      },
    ],
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "Todo_ID": {
                  "type": "number",
                  "example": 1
                },
                "Title" :{
                  "type" : "string",
                  "example" : "newTitle"
                },
                "Body" : {
                  "type" : "string",
                  "example" : "newBody"
                }
              }
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "Success, todo updated",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                    "example": "success"
                  },
                  "message": {
                    "type": "string",
                    "example": "todo successfully updated"
                  },
                  "data": {
                    "type": "object",
                    "properties": {
                      "Todo_ID": {
                        "type": "number",
                        "example": 1
                      },
                      "Username": {
                        "type": "string",
                        "example": "myUsername"
                      },
                      "Title": {
                        "type": "string",
                        "example": "MyTitle"
                      },
                      "Body": {
                        "type": "string",
                        "example": "MyBody"
                      },
                      "Create_Time": {
                        "type": "Date",
                        "example": 2023/01/01T00:00:00Z
                      },
                      "Last_Update_Time": {
                        "type": "DateTime",
                        "example": 2023/01/01T00:00:00Z
                      },
                      "Status": {
                        "type": "number",
                        "example": 0
                      },
                      "InRecycleBin": {
                        "type": "number",
                        "example": 1
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "400": {
          "description": "Error",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                    "example": "Error"
                  },
                  "message": {
                    "type": "string",
                    "example": "something went wrong while deleting a todo"
                  }
                }
              }
            }
          }
        },
        "401": {
          "description": "Unauthorized",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                    "example": "error"
                  },
                  "message": {
                    "type": "string",
                    "example": "unauthorized"
                  },
                  
                }
              }
            }
          }
        }
      }
    }
  }
}
     */
    this.router.post(
      "/update",
      this.authController.verifyJwt,
      this.todoController.UpdateTodo
    );
    /**
     * @openapi
    {
  "/api/todos/moveToBin": {
    "post": {
      "summary": "Moves a Todo to the Recycle Bin",
      "tags": [
        "Todos"
      ],
      security: [
      {
        BearerAuthentication: [],
      },
    ],
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "Todo_ID": {
                  "type": "number",
                  "example": 1
                }
              }
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "Success, todo moved to bin",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                    "example": "success"
                  },
                  "message": {
                    "type": "string",
                    "example": "todo successfully moved to bin"
                  },
                  "data": {
                    "type": "object",
                    "properties": {
                      "Todo_ID": {
                        "type": "number",
                        "example": 1
                      },
                      "Username": {
                        "type": "string",
                        "example": "myUsername"
                      },
                      "Title": {
                        "type": "string",
                        "example": "MyTitle"
                      },
                      "Body": {
                        "type": "string",
                        "example": "MyBody"
                      },
                      "Create_Time": {
                        "type": "Date",
                        "example": 2023/01/01T00:00:00Z
                      },
                      "Last_Update_Time": {
                        "type": "DateTime",
                        "example": 2023/01/01T00:00:00Z
                      },
                      "Status": {
                        "type": "number",
                        "example": 0
                      },
                      "InRecycleBin": {
                        "type": "number",
                        "example": 1
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "400": {
          "description": "Error",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                    "example": "Error"
                  },
                  "message": {
                    "type": "string",
                    "example": "something went wrong while moving to bin"
                  }
                }
              }
            }
          }
        },
        "401": {
          "description": "Unauthorized",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                    "example": "error"
                  },
                  "message": {
                    "type": "string",
                    "example": "unauthorized"
                  },
                  
                }
              }
            }
          }
        }
      }
    }
  }
}
     */
    this.router.post(
      "/moveToBin",
      this.authController.verifyJwt,
      this.todoController.MoveToBin
    );
    /**
     * @openapi
    {
  "/api/todos/recoverFromBin": {
    "post": {
      "summary": "Moves a Todo to the Recycle Bin",
      "tags": [
        "Todos"
      ],
      security: [
      {
        "BearerAuthentication": [],
      },
    ],
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "Todo_ID": {
                  "type": "number",
                  "example": 1
                }
              }
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "Success, todo recovered from bin",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                    "example": "success"
                  },
                  "message": {
                    "type": "string",
                    "example": "todo successfully moved to bin"
                  },
                  "data": {
                    "type": "object",
                    "properties": {
                      "Todo_ID": {
                        "type": "number",
                        "example": 1
                      },
                      "Username": {
                        "type": "string",
                        "example": "myUsername"
                      },
                      "Title": {
                        "type": "string",
                        "example": "MyTitle"
                      },
                      "Body": {
                        "type": "string",
                        "example": "MyBody"
                      },
                      "Create_Time": {
                        "type": "Date",
                        "example": 2023/01/01T00:00:00Z
                      },
                      "Last_Update_Time": {
                        "type": "DateTime",
                        "example": 2023/01/01T00:00:00Z
                      },
                      "Status": {
                        "type": "number",
                        "example": 0
                      },
                      "InRecycleBin": {
                        "type": "number",
                        "example": 0
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "400": {
          "description": "Error",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                    "example": "Error"
                  },
                  "message": {
                    "type": "string",
                    "example": "something went wrong during todo recovery"
                  }
                }
              }
            }
          }
        },
        "401": {
          "description": "Unauthorized",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                    "example": "error"
                  },
                  "message": {
                    "type": "string",
                    "example": "unauthorized"
                  },
                  
                }
              }
            }
          }
        }
      }
    }
  }
}
     */
    this.router.post(
      "/recoverFromBin",
      this.authController.verifyJwt,
      this.todoController.RecoverFromBin
    );
    /**
     * @openapi
    {
  "/api/todos/markAsDone": {
    "post": {
      "summary": "Marks a todo as done",
      "tags": [
        "Todos"
      ],
      security: [
      {
        BearerAuthentication: [],
      },
    ],
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "Todo_ID": {
                  "type": "number",
                  "example": 1
                }
              }
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "Success, todo marked as done",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                    "example": "success"
                  },
                  "message": {
                    "type": "string",
                    "example": "todo successfully marked as done"
                  },
                  "data": {
                    "type": "object",
                    "properties": {
                      "Todo_ID": {
                        "type": "number",
                        "example": 1
                      },
                      "Username": {
                        "type": "string",
                        "example": "myUsername"
                      },
                      "Title": {
                        "type": "string",
                        "example": "MyTitle"
                      },
                      "Body": {
                        "type": "string",
                        "example": "MyBody"
                      },
                      "Create_Time": {
                        "type": "Date",
                        "example": 2023/01/01T00:00:00Z
                      },
                      "Last_Update_Time": {
                        "type": "DateTime",
                        "example": 2023/01/01T00:00:00Z
                      },
                      "Status": {
                        "type": "number",
                        "example": 1
                      },
                      "InRecycleBin": {
                        "type": "number",
                        "example": 0
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "400": {
          "description": "Error",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                    "example": "Error"
                  },
                  "message": {
                    "type": "string",
                    "example": "something went wrong marking as done"
                  }
                }
              }
            }
          }
        },
        "401": {
          "description": "Unauthorized",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                    "example": "error"
                  },
                  "message": {
                    "type": "string",
                    "example": "unauthorized"
                  },
                  
                }
              }
            }
          }
        }
      }
    }
  }
}
     */
    this.router.post(
      "/markAsDone",
      this.authController.verifyJwt,
      this.todoController.MarkAsDone
    );
  }
}
