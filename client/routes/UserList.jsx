import { useEffect, useState } from 'react';
import { getAllUsers } from '../queries/query';
import './UserList.css';

function UserList() {
  const blankForm = {
    role_id: '',
    name_first: '',
    name_last: '',
    username: '',
    password: '',
    passwordAgain: ''
  };

  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(blankForm);

  useEffect(() => {
    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: getAllUsers()
      })
    })
      .then(res => res.json())
      .then(result => {
        setUsers(result.data.users);
      });
  }, []);

  function handleClick(action, clickedUser) {
    let updatedUsers = [...users.filter(user => user._id !== clickedUser._id)];

    switch (action) {
      case 'toggleActive':
        updatedUsers.push({ ...clickedUser, isActive: !clickedUser.isActive });
        break;
      case 'toggleHidden':
        // intentionally left empty
        break;
      // cases for update and new user?
      default:
        break;
    }

    // TODO: update server
    setUsers(updatedUsers);
  }

  function handleFormChange(e) {
    let newForm = {};
    newForm[e.target.name] = e.target.value;
    setForm({ ...form, ...newForm });
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    // TODO

    setForm(blankForm);
  }

  const listUsers = users
    .filter(user => user.isHidden === false)
    .toSorted((a, b) => a._id - b._id)
    .map(user => (
      <tr key={user._id}>
        <td className='icon' onClick={() => handleClick('toggleActive', user)}>
          <span className='material-symbols-outlined'>
            {user.isActive ? 'check_box' : 'check_box_outline_blank'}
          </span>
        </td>
        <td className={user.isActive ? undefined : 'text-strike'}>
          {user.name_first}
        </td>
        <td className={user.isActive ? undefined : 'text-strike'}>
          {user.name_last}
        </td>
        <td className={user.isActive ? undefined : 'text-strike'}>
          {user.role.name}
        </td>
        <td className='icon' /*onClick=???*/>
          <span className='material-symbols-outlined'>edit</span>
        </td>
        <td className='icon' onClick={() => handleClick('toggleHidden', user)}>
          <span className='material-symbols-outlined'>delete</span>
        </td>
      </tr>
    ));

  return (
    <div className='user-list'>
      <form hidden={false}>
        <label>
          First Name
          <input
            id='name_first'
            name='name_first'
            onChange={handleFormChange}
            type='text'
            required
            value={form.name_first}
          />
        </label>
        <label>
          Last Name
          <input
            id='name_last'
            name='name_last'
            onChange={handleFormChange}
            type='text'
            required
            value={form.name_last}
          />
        </label>
        <label>
          Username
          <input
            id='username'
            name='username'
            onChange={handleFormChange}
            type='email'
            required
            value={form.username}
          />
        </label>
        <label>
          Enter Password
          <input
            id='password'
            name='password'
            onChange={handleFormChange}
            type='password'
            required
            value={form.password}
          />
        </label>
        <label>
          Enter Password Again
          <input
            id='passwordAgain'
            name='passwordAgain'
            onChange={handleFormChange}
            type='password'
            required
            value={form.passwordAgain}
          />
        </label>
        <fieldset>
          <legend>Select role:</legend>
          {/* refactor to a mapping */}
          <label>
            admin
            <input
              onChange={handleFormChange}
              name='role_id'
              type='radio'
              id='admin'
              value='0'
            />
          </label>
          <label>
            readAll
            <input
              onChange={handleFormChange}
              name='role_id'
              type='radio'
              id='readAll'
              value='1'
            />
          </label>
          <label>
            user
            <input
              onChange={handleFormChange}
              name='role_id'
              type='radio'
              id='user'
              value='2'
            />
          </label>
          {/* end refactor */}
        </fieldset>
        <button type='submit' onClick={handleFormSubmit}>
          Submit
        </button>
        <button type='button' onClick={() => setForm(blankForm)}>
          Reset
        </button>
      </form>

      <table className='user-table'>
        <thead>
          <tr>
            <th></th>
            <th>First</th>
            <th>Last</th>
            <th>Role</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{listUsers}</tbody>
      </table>
    </div>
  );
}

export default UserList;
