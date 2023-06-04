import styles from "./Filter.module.css";

export enum FilterState {
  ALL = "All",
  ACTIVE = "Active",
  COMPLETE = "Complete",
}

type FilterProps = {
  onFilterTodo: (currentFilter: FilterState) => void;
  currentFilter: FilterState;
};

const Filter = ({
  onFilterTodo,
  currentFilter = FilterState.ALL,
}: FilterProps): JSX.Element => {
  const cycleTodoFilter = () => {
    let newFilter: FilterState = FilterState.ALL;
    if (currentFilter === FilterState.ALL) {
      newFilter = FilterState.ACTIVE;
    } else if (currentFilter === FilterState.ACTIVE) {
      newFilter = FilterState.COMPLETE;
    } else {
      newFilter = FilterState.ALL;
    }
    onFilterTodo(newFilter);
  };

  return (
    <button onClick={cycleTodoFilter} className={styles.filterButton}>
      {currentFilter}
    </button>
  );
};

export default Filter;
