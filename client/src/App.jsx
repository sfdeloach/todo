import { useState, useEffect } from 'react';
import { getSessionInfo } from '../queries/query';
import Home from '../routes/Home';
import Login from '../routes/Login';

function App() {
  const [session, setSession] = useState({ data: { session: null } });

  useEffect(() => {
    fetch('http://localhost:3000/get-session')
      .then(res => res.json())
      .then(data => {
        const sessionID = data;
        fetch('http://localhost:3000/api', {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: getSessionInfo(sessionID) })
        })
          .then(res => res.json())
          .then(data => {
            setSession(data);
          });
      });
  }, []);

  const isLoggedIn = () => session.data.session !== null;

  return <>{isLoggedIn() ? <Home /> : <Login />}</>;
}

export default App;
