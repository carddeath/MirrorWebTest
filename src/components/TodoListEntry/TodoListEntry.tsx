import React, { useState } from "react";
import { Todo } from "../../models/todo";
import styles from "./TodoListEntry.module.css";

type TodoListEntryProps = {
  todo: Todo;
  onDeleteTodo: (todoId: string) => void;
  onUpdateTodo: (todo: Todo, isActive: boolean, newTodoText?: string) => void;
};

const TodoListEntry = ({
  todo,
  onDeleteTodo,
  onUpdateTodo,
}: TodoListEntryProps): JSX.Element => {
  const [currentTodoValue, setCurrentTodoValue] = useState<string>(todo.text);

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setCurrentTodoValue(event.currentTarget.value);
  };

  return (
    <div key={todo.id} className={styles.todoEntry}>
      <li>
        <input
          className={`${styles.todoExistingInput} 
            ${
              todo.completed
                ? styles.borderStateComplete
                : styles.borderStateIncomplete
            }
          `}
          type="text"
          name={todo.id}
          value={currentTodoValue}
          onChange={(e: React.FormEvent<HTMLInputElement>) => onChange(e)}
          onBlur={() => {
            onUpdateTodo(todo, todo.completed, currentTodoValue);
          }}
        />
      </li>
      <button
        onClick={() => onUpdateTodo(todo, !todo.completed)}
        className={`${
          todo.completed ? styles.stateComplete : styles.stateIncomplete
        }`}
      >
        {todo.completed ? "Completed" : "Active"}
      </button>
      <button
        onClick={() => onDeleteTodo(todo.id)}
        className={styles.deleteTodoButton}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoListEntry;
