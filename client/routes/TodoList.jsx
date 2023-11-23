import { useEffect, useRef, useState } from 'react';
import { getAllTodos, addTodo } from '../queries/query';
import './TodoList.css';

function TodoList({ currentUser }) {
  const inputRef = useRef();

  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('typing');
  const [form, setForm] = useState('');

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

  function handleFormChange(e) {
    setForm(e.target.value);
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
        setForm('');
        setStatus('typing');
        setTodos(result.data.addTodo);
      });
  }

  function handleDrag(e, order) {
    e.dataTransfer.setData('order', order);
  }

  function handleOnDrop(e, order) {
    const from = parseInt(e.dataTransfer.getData('order'));
    const to = order;

    const nextTodos = todos.map(todo => {
      if (todo.order === from) {
        todo.order = to;
      } else if (todo.order === to) {
        todo.order = from;
      }
      return todo;
    });

    setTodos(nextTodos);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function checkTodo(id) {
    const nextTodos = todos.map(todo => {
      if (todo._id === id) {
        todo.isActive = !todo.isActive;
      }
      return todo;
    });

    setTodos(nextTodos);
  }

  function hideTodo(id) {
    const nextTodos = todos.map(todo => {
      if (todo._id === id) {
        todo.isHidden = true;
      }
      return todo;
    });

    setTodos(nextTodos);
  }

  const listTodos = todos
    .toSorted((a, b) => a.order - b.order)
    .filter(todo => parseInt(todo.user_id) === currentUser._id)
    .filter(todo => todo.isHidden === false)
    .map(todo => (
      <tr key={todo._id}>
        <td className='icon' onClick={() => checkTodo(todo._id)}>
          <span className='material-symbols-outlined'>
            {todo.isActive ? 'check_box_outline_blank' : 'check_box'}{' '}
          </span>
        </td>
        <td
          draggable
          onDragStart={e => handleDrag(e, todo.order)}
          onDrop={e => handleOnDrop(e, todo.order)}
          style={
            todo.isActive
              ? {}
              : { color: '#aaa', textDecoration: 'line-through' }
          }>
          {todo.text}
        </td>
        <td className='icon'>
          <span className='material-symbols-outlined'>edit</span>
        </td>
        <td className='icon'>
          <span
            className='material-symbols-outlined'
            onClick={() => hideTodo(todo._id)}>
            delete
          </span>
        </td>
      </tr>
    ));

  return (
    <div className='todoList'>
      <h1>{currentUser.name_first}'s todo list</h1>
      <form onSubmit={handleSubmit}>
        <label>
          add a todo:
          <input
            autoFocus={true}
            disabled={status === 'submitting'}
            name='todo'
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
