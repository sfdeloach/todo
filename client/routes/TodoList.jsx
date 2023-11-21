import { useEffect, useState } from 'react';
import { getTodos } from '../queries/query';
import './TodoList.css';

function TodoList({ currentUser }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: getTodos(currentUser._id)
      })
    })
      .then(res => res.json())
      .then(result => {
        setTodos(result.data.user.todos);
      });
  }, []);

  function handleDrag(e, index) {
    e.dataTransfer.setData('index', index);
  }

  function handleOnDrop(e) {
    const from = e.dataTransfer.getData('index');
    const to = e.target.parentNode.id;
    const copy = [...todos];

    const temp = copy[to];
    copy[to] = copy[from];
    copy[from] = temp;
    
    setTodos(copy);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function checkTodo(index) {
    const copy = [...todos];
    copy[index].isActive = !copy[index].isActive;
    setTodos(copy);
  }

  const listTodos = todos.map((todo, index) => (
    <tr key={todo._id} id={index}>
      <td className='icon' onClick={() => checkTodo(index)}>
        <span className='material-symbols-outlined'>
          {todo.isActive ? 'check_box_outline_blank' : 'check_box'}{' '}
        </span>
      </td>
      <td
        draggable
        onDragStart={e => handleDrag(e, index)}
        style={todo.isActive ? {} : { color: '#aaa', textDecoration: 'line-through' }}
      >
        {todo.text}
      </td>
      <td className='icon'>
        <span className='material-symbols-outlined'>edit</span>
      </td>
      <td className='icon'>
        <span className='material-symbols-outlined'>delete</span>
      </td>
    </tr>
  ));

  return (
    <div className='todoList'>
      <h1>{currentUser.name_first}'s todo list:</h1>
      <table>
        <tbody onDrop={e => handleOnDrop(e)} onDragOver={e => handleDragOver(e)}>
          {listTodos}
        </tbody>
      </table>
    </div>
  );
}

export default TodoList;
