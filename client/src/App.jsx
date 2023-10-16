import { useEffect, useState } from 'react';
import { getSession } from '../queries/query';
import './App.css';

function App() {
  const [session, setSession] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/api', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: getSession('CAbQ7jTx6oxUtjWSyUVshbmUBZAa5z_D') })
    })
      .then(res => res.json())
      .then(data => {
        setSession(data);
        // TODO: if logged on, get user info
        // TODO: if not logged on, route to log in screen
      });
  }, []);

  return (
    <>
      <h1>TODO app</h1>
      <pre>
        session = <strong>{JSON.stringify(session)}</strong>
      </pre>
    </>
  );
}

export default App;
