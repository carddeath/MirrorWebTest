import React, { useState } from "react";
import Filter, { FilterState } from "../Filter/Filter";
import styles from "./TodoAddBar.module.css";

type TodoAddBarProps = {
  onAddNewTodo: (todo: string) => void;
  onFilterTodo: (currentFilter: FilterState) => void;
  placeHolder?: string;
  currentFilter: FilterState;
};

const TodoAddBar = ({
  onAddNewTodo,
  onFilterTodo,
  placeHolder = "",
  currentFilter,
}: TodoAddBarProps): JSX.Element => {
  const [newTodo, setNewTodo] = useState<string>("");

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setNewTodo(event.currentTarget.value);
  };

  const onSubmitNewTodo = () => {
    if (newTodo !== "") {
      onAddNewTodo(newTodo);
    }
  };

  return (
    <div className={styles.todoInputWrapper}>
      <input
        type="text"
        name="todo"
        placeholder={placeHolder}
        onChange={(e: React.FormEvent<HTMLInputElement>) => onChange(e)}
      />
      <button className={styles.addTodoButton} onClick={onSubmitNewTodo}>
        Add
      </button>
      <Filter onFilterTodo={onFilterTodo} currentFilter={currentFilter} />
    </div>
  );
};
export default TodoAddBar;
