import { useEffect, useState } from 'react';

import Error from '../routes/Error';
import Loading from '../routes/Loading';
import Login from '../routes/Login';
import TodoList from '../routes/TodoList';
import TopNav from './TopNav';

function App() {
  const [user, setUser] = useState({ loggedIn: false });
  const [page, setPage] = useState('loading');

  useEffect(() => {
    fetch('http://localhost:3000/session')
      .then(res => res.json())
      .then(session => {
        if (!session.user || !session.user.loggedIn) {
          setPage('login');
        } else {
          setUser(session.user);
          setPage('todo-list');
        }
      });
  }, []);

  function initUser(user) {
    setUser(user);
    setPage('todo-list');
  }

  function logout() {
    fetch('http://localhost:3000/logout')
      .then(res => res.json())
      .then(data => {
        if (data.loggedIn === false) {
          setUser(data);
          setPage('login');
        } else {
          console.error('unable to logout of server');
        }
      });
  }

  function renderPage(page) {
    switch (page) {
      case 'loading':
        return <Loading />;
      case 'login':
        return <Login initUser={initUser} />;
      case 'todo-list':
        return <TodoList currentUser={user} />;
      default:
        return <Error />;
    }
  }

  return (
    <>
      <TopNav currentUser={user} logout={logout} />
      {renderPage(page)}
    </>
  );
}

export default App;
