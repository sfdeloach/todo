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

  const listTodos = todos.map((todo, index) => (
    <tr
      key={todo._id}
      onClick={() => {
        const todosCopy = [...todos];
        todosCopy[index].isActive = !todosCopy[index].isActive;
        setTodos(todosCopy);
      }}
    >
      <td className='icon'>{todo.isActive ? '[ ]' : '[x]'}</td>
      <td>{todo.text}</td>
      <td className='icon'>🗑️</td>
    </tr>
  ));

  return (
    <div className='todoList'>
      <h1>{currentUser.name_first}'s todo list:</h1>
      <table>
        <tbody>{listTodos}</tbody>
      </table>
    </div>
  );
}

export default TodoList;
