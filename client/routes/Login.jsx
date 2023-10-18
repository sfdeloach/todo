import { useState } from 'react';
import { getUserInfo } from '../queries/query';

function Login() {
  const blankForm = { username: '', password: '' };

  const [form, setForm] = useState(blankForm);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing'); // 'typing', 'submitting', or 'success'

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const user = await submitForm(form);
      setError(null);
      setStatus('success');
      console.log(user);
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
    <>
      <h2>Login</h2>
      {error !== null && <p>username or password does not match</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username &nbsp;
          <input
            autoComplete='true'
            disabled={status === 'submitting'}
            name='username'
            onChange={handleFormChange}
            type='text'
            value={form.username}
          />
        </label>
        <br />
        <label>
          Password &nbsp;
          <input
            autoComplete='true'
            disabled={status === 'submitting'}
            name='password'
            onChange={handleFormChange}
            type='text'
            value={form.password}
          />
        </label>
        <br />
        <button disabled={status === 'submitting'}>Submit</button>
      </form>
    </>
  );
}

function submitForm(form) {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3000/api', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: getUserInfo(form.username, form.password) })
    })
      .then(res => res.json())
      .then(data => {
        const user = data.data.user;
        if (user.error) reject(user.error);
        else resolve(user);
      });
  });
}

export default Login;
