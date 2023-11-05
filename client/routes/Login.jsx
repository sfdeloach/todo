import { useState } from 'react';

function Login() {
  const blankForm = { username: '', password: '' };

  // status = 'typing', 'submitting', or 'success'
  const [status, setStatus] = useState('typing');
  const [error, setError] = useState(null);
  const [form, setForm] = useState(blankForm);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const user = await submitForm(form);
      console.log(user);
      setError(null);
      setStatus('success');
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
    fetch('http://localhost:3000/login', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: form.username, password: form.password })
    })
      .then(res => res.json())
      .then(data => {
        resolve(data);
      });
  });
}

export default Login;
