import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { TodoAdd } from './components/TodoAdd';
import { TodoList } from './components/TodoList';
import { useTodo } from './hooks/useTodo';

function App() {
  const {
    todos,
    todosCount,
    pendingTodosCount,
    handleNewTodo,
    handleDeleteTodo,
    handleCompleteTodo,
    handleUpdateTodo,
  } = useTodo();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <TodoApp
              todos={todos}
              todosCount={todosCount}
              pendingTodosCount={pendingTodosCount}
              handleNewTodo={handleNewTodo}
              handleDeleteTodo={handleDeleteTodo}
              handleCompleteTodo={handleCompleteTodo}
              handleUpdateTodo={handleUpdateTodo}
            />
          }
        />
      </Routes>
    </Router>
  );
}

function TodoApp({
  todos,
  todosCount,
  pendingTodosCount,
  handleNewTodo,
  handleDeleteTodo,
  handleCompleteTodo,
  handleUpdateTodo,
}) {
  return (
    <div className='card-to-do'>
      <h1>Lista de tareas</h1>
      <div className='counter-todos'>
        <h3>
          N° Tareas: <span>{todosCount}</span>
        </h3>
        <h3>
          Pendientes: <span>{pendingTodosCount}</span>
        </h3>
      </div>

      <div className='add-todo'>
        <h3>Agregar Tarea</h3>
        <TodoAdd handleNewTodo={handleNewTodo} />
      </div>

      <TodoList
        todos={todos}
        handleUpdateTodo={handleUpdateTodo}
        handleDeleteTodo={handleDeleteTodo}
        handleCompleteTodo={handleCompleteTodo}
      />
    </div>
  );
}

export default App;
