import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { TodoAdd } from './components/TodoAdd';
import { TodoList } from './components/TodoList';
import { useTodo } from './hooks/useTodo';
import Login from './login/Login';
import task from "./services/task";
import { useState, useEffect } from 'react';
function App() {
  const serviceTasks=new task()
  const [dataTask, setDataTask] = useState([])
  useEffect(() => {
    async function fetchData() {
      await serviceTasks.getTareas().then((data) => {
        setDataTask(data);
        console.log(data);
      });
    }

    fetchData();
  }
  , []);
  function Table(data){
    return dataTask.map((data,index) =>{
    <tr key={index}>
            <td>{index}</td>
            <td>{data.categoriaNombre}</td>
            <td>{data.descripcion}</td>
            <td>{data.estado}</td>
    </tr>
    })
  
    }
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
              todos={dataTask}
              todosCount={todosCount}
              pendingTodosCount={pendingTodosCount}
              handleNewTodo={handleNewTodo}
              handleDeleteTodo={handleDeleteTodo}
              handleCompleteTodo={handleCompleteTodo}
              handleUpdateTodo={handleUpdateTodo}
            />
          }
          


        />
        
        <Route path='/login'element={<Login/>}> </Route>
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
      <div className='list-todo'>
        <TodoList
          todos={todos}
          handleUpdateTodo={handleUpdateTodo}
          handleDeleteTodo={handleDeleteTodo}
          handleCompleteTodo={handleCompleteTodo}
        />
      </div>

    </div>
  );
}

export default App;
