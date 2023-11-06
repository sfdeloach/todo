import { useEffect, useState } from 'react';
import { getTodos } from '../queries/query';

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

  const listTodos = todos.map(todo => (
    <li
      key={todo._id}
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
      }}
      onMouseEnter={e => {
        e.target.style.backgroundColor = '#eee';
        e.target.style.cursor = 'pointer';
      }}
      onMouseLeave={e => (e.target.style.backgroundColor = '#fff')}
    >
      <span>{todo.text}</span>
      <span>🗑️</span>
    </li>
  ));

  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem'
      }}
    >
      <ul
        style={{
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: '1rem',
          width: '50vw',
          listStyleType: 'none',
          margin: '0',
          padding: '0',
          outline: '1px solid black'
        }}
      >
        {listTodos}
      </ul>
    </div>
  );
}

export default TodoList;
