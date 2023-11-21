import { useState } from 'react';
import './Login.css';

function Login({ initUser }) {
  const blankForm = { username: '', password: '' };

  // status = 'typing', 'submitting', or 'success'
  const [status, setStatus] = useState('typing');
  const [error, setError] = useState(null);
  const [form, setForm] = useState(blankForm);

  function resetForm(e) {
    e.preventDefault();
    setStatus('typing');
    setError(null);
    setForm(blankForm);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const user = await submitForm(form);
      setStatus('success');
      setError(null);
      initUser(user);
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }

  function handleFormChange(e) {
    let update = { ...form };
    update[e.target.name] = e.target.value;
    setForm(update);
  }

  return (
    <div>
      <form
        style={{
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <label
          style={{
            width: '18rem',
            display: 'flex',
            flexFlow: 'column nowrap'
          }}
        >
          Username
          <input
            autoComplete='true'
            disabled={status === 'submitting' || status === 'success'}
            name='username'
            onChange={handleFormChange}
            type='text'
            value={form.username}
          />
        </label>
        <label
          style={{
            width: '18rem',
            display: 'flex',
            flexFlow: 'column nowrap'
          }}
        >
          Password
          <input
            autoComplete='true'
            disabled={status === 'submitting' || status === 'success'}
            name='password'
            onChange={handleFormChange}
            type='password'
            value={form.password}
          />
        </label>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleSubmit} disabled={status === 'submitting'}>
            Submit
          </button>
          <button onClick={resetForm}>Reset</button>
        </div>
        {error !== null && <p>username or password does not match</p>}
        {status === 'success' && <p>successful login</p>}
      </form>
    </div>
  );
}

function submitForm(form) {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3000/login', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: form.username, password: form.password })
    })
      .then(res => res.json())
      .then(data => {
        data.loggedIn ? resolve(data) : reject(data);
      });
  });
}

export default Login;
