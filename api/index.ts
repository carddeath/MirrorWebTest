import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import crypto from "crypto";
import { corsEnable } from "./middleware/cors";
import { Todo } from "./models/Todo";
import { FilterState } from "./models/Filter";

// This is the entry point for our API. You can split your
// handlers into multiple files if you'd like, but this isn't
// essential for a small application like this.

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(corsEnable);

global.todos = [
  {
    id: "31693794-a53b-41b8-bb39-965b94e37db5",
    text: "Create some todos...",
    completed: false,
    createdAt: "2023-04-27T16:58:40.657Z",
  },
];

server.get("/api/todos", (req: Request, res: Response) => {
  let todosToReturn: Array<Todo> = global.todos;
  if (req.query.filter !== FilterState.ALL) {
    todosToReturn =
      req.query.filter === FilterState.ACTIVE
        ? global.todos.filter((todo: Todo) => !todo.completed)
        : global.todos.filter((todo: Todo) => todo.completed);
  }
  res.status(200).json({ data: todosToReturn });
});

server.post("/api/todos", (req: Request, res: Response) => {
  const newTodo: Todo = {
    id: crypto.randomUUID(),
    text: req.body.text,
    completed: false,
    createdAt: new Date(),
  };

  global.todos = [...global.todos, newTodo];

  res.status(201).json({ status: "Success" });
});

server.patch("/api/todos/:id/", (req: Request, res: Response) => {
  const newTodoList = global.todos.map((todo) => {
    if (todo.id === req.params.id) {
      return {
        id: todo.id,
        text: req.query.text,
        completed: req.query.isActive === "true" ? true : false,
        createdAt: todo.createdAt,
      };
    } else {
      return todo;
    }
  });

  global.todos = newTodoList;

  res.status(204).json({ status: "Success" });
});

server.delete("/api/todos/:id", (req: Request, res: Response) => {
  const todos: Array<Todo> = global.todos;
  const todosWithDeletion: Array<Todo> = todos.filter(
    (todo) => todo.id !== req.params.id
  );

  global.todos = todosWithDeletion;

  res.status(204).json({ status: "Success" });
});

server.listen(8080, () => {
  console.log("Server listening at http://localhost:8080");
});
