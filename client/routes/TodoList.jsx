/**
 *  resource credits:
 *
 *  references used to focus on a todo when editing -
 *  https://mattclaffey.medium.com/adding-react-refs-to-an-array-of-items-96e9a12ab40c
 */

import { useEffect, useRef, useState } from 'react';
import { addTodo, getAllTodos, updateTodo } from '../queries/query';
import './TodoList.css';

function TodoList({ currentUser }) {
  const editRefs = useRef(new Set());
  const inputRef = useRef();

  const [edit, setEdit] = useState({ _id: '', text: '' });
  const [form, setForm] = useState('');
  const [status, setStatus] = useState('typing');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: getAllTodos()
      })
    })
      .then(res => res.json())
      .then(result => {
        setTodos(result.data.todos);
      });
  }, []);

  // places focus on input after form submission
  useEffect(() => {
    if (status === 'typing') {
      inputRef.current.focus();
    }
  }, [status]);

  // places focus on the todo when editing
  useEffect(() => {
    if (edit._id !== '') {
      for (const item of editRefs.current) {
        item.focus();
      }
    }
  }, [edit]);

  function handleFormChange(e) {
    setForm(e.target.value);
  }

  function handleEditChange(e) {
    setEdit({ ...edit, text: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');

    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: addTodo(),
        variables: {
          user_id: currentUser._id.toString(),
          text: form
        }
      })
    })
      .then(res => res.json())
      .then(result => {
        setTodos(result.data.addTodo);
        setForm('');
        setStatus('typing');
      });
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    handleClick('edit', edit._id, edit.text);
    setEdit({ _id: '', text: '' });
  }

  function handleDrag(e, todo) {
    e.dataTransfer.setData('todo', JSON.stringify(todo));
  }

  function handleOnDrop(e, todo) {
    const from = JSON.parse(e.dataTransfer.getData('todo'));
    const emptyString = '';
    handleClick('reorder', from._id, emptyString, todo._id);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleClick(action, _id, text = '', theOtherID = '') {
    setStatus('submitting');

    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: updateTodo(),
        variables: { _id, action, text, theOtherID }
      })
    })
      .then(res => res.json())
      .then(result => {
        setTodos(result.data.updateTodo);
        setStatus('typing');
      });
  }

  const listTodos = todos
    .filter(todo => todo.isHidden === false)
    .filter(todo => parseInt(todo.user_id) === currentUser._id)
    .toSorted((a, b) => b.position - a.position)
    .map(todo => (
      <tr key={todo._id}>
        <td
          className='icon'
          disabled={status === 'submitting'}
          onClick={() => handleClick('check', todo._id)}>
          <span className='material-symbols-outlined'>
            {todo.isActive ? 'check_box_outline_blank' : 'check_box'}
          </span>
        </td>
        <td
          disabled={status === 'submitting'}
          draggable
          hidden={edit._id === todo._id}
          onDragStart={e => handleDrag(e, todo)}
          onDrop={e => handleOnDrop(e, todo)}
          style={
            todo.isActive
              ? {}
              : { color: '#aaa', textDecoration: 'line-through' }
          }>
          {todo.text}
        </td>
        <td hidden={edit._id !== todo._id}>
          <form onSubmit={handleEditSubmit}>
            <input
              disabled={status === 'submitting'}
              name={`edit-todo-${todo._id}`}
              onChange={handleEditChange}
              ref={e => {
                if (e) editRefs.current.add(e);
              }}
              type='text'
              value={edit.text}
            />
          </form>
        </td>
        <td
          className='icon'
          style={edit._id === todo._id ? { visibility: 'hidden' } : {}}>
          <span
            className='material-symbols-outlined'
            disabled={status === 'submitting'}
            onClick={() => {
              setEdit({ _id: todo._id, text: todo.text });
            }}>
            edit
          </span>
        </td>
        <td className='icon'>
          <span
            className='material-symbols-outlined'
            disabled={status === 'submitting'}
            onClick={() => handleClick('hide', todo._id)}>
            delete
          </span>
        </td>
      </tr>
    ));

  return (
    <div className='todo-list'>
      <h1>{currentUser.name_first}'s todo list</h1>
      <form onSubmit={handleSubmit}>
        <label>
          add a todo:
          <input
            autoFocus={true}
            disabled={status === 'submitting'}
            name='new-todo'
            onChange={handleFormChange}
            ref={inputRef}
            type='text'
            value={form}
          />
        </label>
      </form>
      <table>
        <tbody onDragOver={e => handleDragOver(e)}>{listTodos}</tbody>
      </table>
    </div>
  );
}

export default TodoList;
