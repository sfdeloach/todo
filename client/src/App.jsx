import { useEffect, useState } from 'react';

import Error from '../routes/Error';
import Loading from '../routes/Loading';
import Login from '../routes/Login';
import TodoList from '../routes/TodoList';

import { getRoleNames } from '../queries/query';

function App() {
  const [user, setUser] = useState({ loggedIn: false });
  const [page, setPage] = useState('loading');

  useEffect(() => {
    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: getRoleNames() }) // getTodos?
    })
      .then(res => res.json())
      .then(data => {
        data.error ? setPage('login') : setPage('todo-list');
      });
  }, []);

  function getPage(page) {
    switch (page) {
      case 'loading':
        return <Loading />;
      case 'login':
        return <Login userSetter={userSetter} />;
      case 'todo-list':
        return <TodoList currentUser={user} />;
      default:
        return <Error />;
    }
  }

  function userSetter(user) {
    setUser(user);
    setPage('todo-list');
  }

  return getPage(page);
}

export default App;
