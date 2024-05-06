import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { TodoUpdate } from './TodoUpdate';

export const TodoItem = ({
    todo,
    handleUpdateTodo,
    handleDeleteTodo,
    handleCompleteTodo,
}) => {
    const handleCompleteClick = () => {
        // Actualizar la tarea como completada
        const updatedTodo = {
            ...todo,
            done: true,
        };
        // Llamar a la función handleCompleteTodo con el ID de la tarea y la tarea actualizada
        handleCompleteTodo(todo.id, updatedTodo);
    };

    return (
        <li>
            <span onClick={handleCompleteClick}>
                <label className={`container-done ${todo.done ? 'active' : ''}`}></label>
            </span>
            <TodoUpdate todo={todo} handleUpdateTodo={handleUpdateTodo} />
            <button className='btn-delete' onClick={() => handleDeleteTodo(todo.id)}>
                <FaTrash />
            </button>
        </li>
    );
};
