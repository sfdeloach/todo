module.exports.todos = [
  {
    _id: 0,
    user_id: 0,
    isActive: true,
    isHidden: false,
    text: 'Set agenda for meeting'
  }
];

module.exports.roles = [
  { _id: 0, name: 'admin', description: 'full read/write access to all todos' },
  { _id: 1, name: 'readAll', description: 'read only access to all todos' },
  { _id: 2, name: 'user', description: 'only read/write to their todos' }
];

module.exports.sessions = [{ _id: 0, user_id: 0 }];

module.exports.users = [
  {
    _id: 0,
    role_id: 0,
    isActive: true,
    isHidden: false,
    name: { last: 'Admin', first: 'Anthony' },
    username: 'tony.admin@xyz.com',
    password: 'password'
  },
  {
    _id: 0,
    role_id: 1,
    isActive: true,
    isHidden: false,
    name: { last: 'Readall', first: 'Rebecca' },
    username: 'becky@reads.edu',
    password: 'password'
  },
  {
    _id: 0,
    role_id: 2,
    isActive: true,
    isHidden: false,
    name: { last: 'User', first: 'Ulysses' },
    username: 'uly@abc.edu',
    password: 'password'
  }
];
