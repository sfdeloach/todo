module.exports.todos = [
  {
    _id: 0,
    user_id: 0,
    isActive: true,
    isHidden: false,
    text: 'Set agenda for meeting'
  },
  {
    _id: 1,
    user_id: 0,
    isActive: true,
    isHidden: false,
    text: 'Debug all code'
  },
  {
    _id: 2,
    user_id: 0,
    isActive: true,
    isHidden: false,
    text: 'Submit for approvals'
  }
];

module.exports.users = [
  {
    _id: 0,
    role_id: 0,
    isActive: true,
    isHidden: false,
    name_first: 'Anthony',
    name_last: 'Admin',
    username: 'tony.admin@xyz.com',
    hash: '$2b$10$9jJRjCb8l62p11aCSvNZL.10DhyGQ8lkLzMfGty0QkWN8gxtyWksK'
  },
  {
    _id: 1,
    role_id: 1,
    isActive: true,
    isHidden: false,
    name_first: 'Rebecca',
    name_last: 'Readall',
    username: 'becky@reads.edu',
    hash: '$2b$10$va86wr3nYhVT1.n1zymFQ.oH5iK1tBHfv3zbXcYz6v9zgMzwYNpnS'
  },
  {
    _id: 2,
    role_id: 2,
    isActive: true,
    isHidden: false,
    name_first: 'Ulysses',
    name_last: 'User',
    username: 'uly@abc.edu',
    hash: '$2b$10$PFrlQoQ2Kniy4stAcRzTue0Fe4DROmbJfDK28SfcAIAdcZyXutU8y'
  }
];

module.exports.roles = [
  { _id: 0, name: 'admin', description: 'full read/write access to all todos' },
  { _id: 1, name: 'readAll', description: 'read only access to all todos' },
  { _id: 2, name: 'user', description: 'only read/write to their todos' }
];
