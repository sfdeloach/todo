module.exports.todos = [
  {
    _id: 'f83a39ad-7fa1-4f96-886b-a1eb20f29f6a',
    user_id: 0,
    position: 2,
    isActive: true,
    isHidden: false,
    text: 'Set agenda for meeting'
  },
  {
    _id: 'f83a39ad-7fa1-4f96-886b-a1eb20f29f6b',
    user_id: 0,
    position: 1,
    isActive: true,
    isHidden: false,
    text: 'Debug all code'
  },
  {
    _id: 'f83a39ad-7fa1-4f96-886b-a1eb20f29f6c',
    user_id: 0,
    position: 0,
    isActive: true,
    isHidden: false,
    text: 'Submit for approvals'
  },
  {
    _id: 'f83a39ad-7fa1-4f96-886b-a1eb20f29f6d',
    user_id: 1,
    position: 2,
    isActive: true,
    isHidden: false,
    text: 'Call about tests'
  },
  {
    _id: 'f83a39ad-7fa1-4f96-886b-a1eb20f29f6e',
    user_id: 1,
    position: 1,
    isActive: true,
    isHidden: false,
    text: 'Gain historical perspective'
  },
  {
    _id: 'f83a39ad-7fa1-4f96-886b-a1eb20f29f6f',
    user_id: 1,
    position: 0,
    isActive: true,
    isHidden: false,
    text: 'Go fight fire with info'
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
  {
    _id: 0,
    authLevel: 30,
    name: 'admin',
    description: 'full edit access to all todos'
  },
  {
    _id: 1,
    authLevel: 20,
    name: 'readAll',
    description: 'read only access to all todos'
  },
  {
    _id: 2,
    authLevel: 10,
    name: 'user',
    description: 'only read/write to their todos'
  }
];
