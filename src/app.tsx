// This serves is the main component of the UI application. You can create
// sub-components and import them here, as well as importing stylesheets
// and other assets here too.

import TodoManager from "./components/TodoManager/TodoManager";

export function App() {
  return (
    <div>
      <h1>Todos</h1>
      <TodoManager />
    </div>
  );
}
