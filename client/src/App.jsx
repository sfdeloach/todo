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
      body: JSON.stringify({ query: getRoleNames() })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  }, []);

  return getPage(page);
}

function getPage(page) {
  switch (page) {
    case 'loading':
      return <Loading />;
    case 'login':
      return <Login />;
    case 'todo-list':
      return <TodoList />;
    default:
      return <Error />;
  }
}

export default App;
