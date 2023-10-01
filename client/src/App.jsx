import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [sessionInfo, setSessionInfo] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/session-info')
      .then(res => res.json())
      .then(data => {
        setSessionInfo(data);
      });
  }, []);

  return (
    <>
      <pre>{JSON.stringify(sessionInfo)}</pre>
    </>
  );
}

export default App;
