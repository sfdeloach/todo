import { useEffect, useState } from 'react';
import { getAllUsers } from '../queries/query';
import './UserList.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState();

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

  const listUsers = users.map(user => (
    <tr key={user._id}>
      <td className='icon'>
        <span className='material-symbols-outlined'>
          {user.isActive ? 'check_box_outline_blank' : 'check_box'}
        </span>
      </td>
      <td>{user.name_first}</td>
      <td>{user.name_last}</td>
      <td>{user.role.name}</td>
      <td className='icon'>
        <span
          className='material-symbols-outlined'
          onClick={() => {
            setEditUser(user);
          }}>
          edit
        </span>
      </td>
      <td className='icon'>
        <span className='material-symbols-outlined'>delete</span>
      </td>
    </tr>
  ));

  return (
    <div className='user-list'>
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
      <form style={editUser ? {} : { visibility: 'hidden' }}>
        <p
          style={{
            padding: '1rem'
          }}>
          TODO: form to edit {editUser && JSON.stringify(editUser.name_first)}
        </p>
      </form>
    </div>
  );
}

export default UserList;
