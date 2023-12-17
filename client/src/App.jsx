import { useEffect, useState } from 'react';

import Error from '../routes/Error';
import Loading from '../routes/Loading';
import Login from '../routes/Login';
import TodoList from '../routes/TodoList';
import TopNav from './TopNav';
import UserList from '../routes/UserList';

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

  function handlePageNavigation(page) {
    switch (page) {
      case 'logout':
        logout();
        break;
      case 'user-list':
        setPage('user-list');
        break;
      case 'todo-list':
        if (user.loggedIn) {
          setPage('todo-list');
        }
        break;
      default:
        return <Error />;
    }
  }

  function renderPage(page) {
    switch (page) {
      case 'loading':
        return <Loading />;
      case 'login':
        return <Login initUser={initUser} />;
      case 'todo-list':
        return <TodoList currentUser={user} />;
      case 'user-list':
        return <UserList />;
      default:
        return <Error />;
    }
  }

  return (
    <>
      <TopNav currentUser={user} handlePageNavigation={handlePageNavigation} />
      {renderPage(page)}
    </>
  );
}

export default App;
