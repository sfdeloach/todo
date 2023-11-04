import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState({ loggedIn: false });

  useEffect(() => {
    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: getSessionInfo(sessionID) })
    })
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

  return <>App Page</>;
}

export default App;
