import { useState, useEffect } from "react";
import TodoAddBar from "../TodoAddBar/TodoAddBar";
import { Todo } from "../../models/todo";
import TodoList from "../TodoList/TodoList";
import { FilterState } from "../Filter/Filter";

const TodoManager = (): JSX.Element => {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [filter, setFilter] = useState<FilterState>(FilterState.ALL);

  useEffect(() => {
    const getTodosOnLaunch = async () => {
      await getAllTodos();
    };

    getTodosOnLaunch();
  }, []);

  //All of these call structures could be moved into a client side API folder with a pattern prescribed for the promise with generalised types to clean up this class
  const onSubmitNewTodo = async (newTodo: string): Promise<void> => {
    const response = await fetch("http://localhost:8080/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newTodo }),
    });
    const json = await response.json();
    if (json.status === "Success") {
      await getAllTodos();
    }
  };

  const onDeleteTodo = async (todoId: string): Promise<void> => {
    await fetch(`http://localhost:8080/api/todos/${todoId}`, {
      method: "DELETE",
    });

    await getAllTodos();
  };

  const onUpdateTodoStatus = async (
    todo: Todo,
    isActive: boolean,
    newTodoText?: string
  ): Promise<void> => {
    await fetch(
      `http://localhost:8080/api/todos/${todo.id}?text=${
        newTodoText ? newTodoText : todo.text
      }&isActive=${isActive}`,
      {
        method: "PATCH",
      }
    );

    await getAllTodos();
  };

  const getAllTodos = async (backupFilter?: FilterState): Promise<void> => {
    const response = await fetch(
      `http://localhost:8080/api/todos?filter=${
        backupFilter ? backupFilter : filter
      }`
    );
    const todos = await response.json();
    setTodos(todos.data);
  };

  const updateFilter = async (filter: FilterState) => {
    setFilter(filter);
    await getAllTodos(filter);
  };

  return (
    <div>
      <TodoAddBar
        placeHolder="Enter new todo..."
        onAddNewTodo={onSubmitNewTodo}
        onFilterTodo={updateFilter}
        currentFilter={filter}
      />
      <TodoList
        onDeleteTodo={onDeleteTodo}
        onUpdateTodo={onUpdateTodoStatus}
        todos={todos}
      />
    </div>
  );
};

export default TodoManager;
