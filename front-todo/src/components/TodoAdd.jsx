import React, { useState } from 'react';

export const TodoAdd = ({ handleNewTodo }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const [category, setCategory] = useState(''); 

    const handleSubmit = e => {
        e.preventDefault();
        if (!title.trim() || !description.trim() || !category.trim()) return;

        const newTodo = {
            id: new Date().getTime(),
            title,
            description,
            status,
            category 
        };

        handleNewTodo(newTodo);
        setTitle('');
        setDescription('');
        setStatus('pending');
        setCategory(''); 
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                className='input-add'
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder='Título'
            />
            <input
                type='text'
                className='input-add'
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder='Descripción'
            />
            <select
                className='input-add'
                value={status}
                onChange={e => setStatus(e.target.value)}
            >
                <option value='pending'>Pendiente</option>
                <option value='completed'>Completado</option>
                <option value='in-progress'>En progreso</option>
            </select>
            <select
                className='input-add'
                value={category}
                onChange={e => setCategory(e.target.value)}
            >
                <option value=''>Categoría</option>
                <option value='personal'>Personal</option>
                <option value='trabajo'>Trabajo</option>
                <option value='estudio'>Estudio</option>
            </select>
            <button className='btn-add' type='submit'>Agregar</button>
        </form>
    );
};
