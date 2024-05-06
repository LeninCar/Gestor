import React from 'react';
import { TodoItem } from './TodoItem';
import '../App.css';



import task from "../services/task";
import { useState, useEffect } from 'react';
export const TodoList = ({
	todos,
	handleUpdateTodo,
	handleDeleteTodo,
	handleCompleteTodo,
}) => {
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
	const Table=(data)=>{
	  return data.map((data,index) =>{
	  <tr key={index}>
			  <td>{index}</td>
			  <td>{data.categoriaNombre}</td>
			  <td>{data.descripcion}</td>
			  <td>{data.estado}</td>
	  </tr>
	  })
	
	  }
	return (
		<ul>
			{todos.map(todo => (
				<TodoItem
					key={todo.id}
					todo={todo}
					handleUpdateTodo={handleUpdateTodo}
					handleDeleteTodo={handleDeleteTodo}
					handleCompleteTodo={handleCompleteTodo}
				/>
				
			))}
			<table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Categoria Nombre</th>
                    <th>Descripcion</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>{Table(dataTask)}</tbody>
              </table>
		</ul>
		
	);
};
