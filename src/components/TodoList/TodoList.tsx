import { Todo } from "../../models/todo";
import TodoListEntry from "../TodoListEntry/TodoListEntry";
import styles from "./TodoList.module.css";

type TodoListProps = {
  todos: Array<Todo>;
  onDeleteTodo: (todoId: string) => void;
  onUpdateTodo: (todo: Todo, isActive: boolean, newTodoText?: string) => void;
};

const TodoList = ({
  todos,
  onDeleteTodo,
  onUpdateTodo,
}: TodoListProps): JSX.Element => {
  return (
    <div>
      {todos?.length > 0 ? (
        <ul className={styles.todoListWrapper}>
          {todos.map((todo: Todo) => (
            <TodoListEntry
              key={todo.id}
              onDeleteTodo={onDeleteTodo}
              onUpdateTodo={onUpdateTodo}
              todo={todo}
            />
          ))}
        </ul>
      ) : (
        <div className={styles.emptyList}>
          <p>No task found</p>
        </div>
      )}
    </div>
  );
};

export default TodoList;
