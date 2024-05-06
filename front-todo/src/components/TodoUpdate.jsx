import { useRef, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useForm } from '../hooks/useForm';

export const TodoUpdate = ({ todo, handleUpdateTodo }) => {
	const { title: initialTitle, description: initialDescription, status: initialStatus } = todo;

	const { title, description, status, onInputChange } = useForm({
		title: initialTitle,
		description: initialDescription,
		status: initialStatus,
	});

	const [disabled, setDisabled] = useState(true);
	const focusInputRef = useRef();

	const onSubmitUpdate = e => {
		e.preventDefault();

		const id = todo.id;
		const updatedTitle = title;
		const updatedDescription = description;
		const updatedStatus = status;

		handleUpdateTodo(id, updatedTitle, updatedDescription, updatedStatus);

		setDisabled(!disabled);

		focusInputRef.current.focus();
	};

	return (
		<form onSubmit={onSubmitUpdate}>
			<input
				type='text'
				className={`input-update ${todo.done ? 'text-decoration-dashed' : ''}`}
				name='title'
				value={title}
				onChange={onInputChange}
				placeholder='Nombre'
				readOnly={disabled}
				ref={focusInputRef}
			/>

			<input
				type='text'
				className={`input-update ${todo.done ? 'text-decoration-dashed' : ''}`}
				name='description'
				value={description}
				onChange={onInputChange}
				placeholder='Descripción'
				readOnly={disabled}
			/>

			<select
				className='input-update'
				name='status'
				value={status}
				onChange={onInputChange}
				disabled={disabled}
			>
				<option value='pending'>Pendiente</option>
				<option value='completed'>Completado</option>
				<option value='in-progress'>En progreso</option>
			</select>

			<button className='btn-edit' type='submit'>
				<FaEdit />
			</button>
		</form>
	);
};
