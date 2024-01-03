export const roles = [
  {
    _id: 1,
    authLevel: 30,
    name: 'admin',
    description: 'full edit access to all todos'
  },
  {
    _id: 2,
    authLevel: 20,
    name: 'readAll',
    description: 'read only access to all todos'
  },
  {
    _id: 3,
    authLevel: 10,
    name: 'user',
    description: 'only read/write to their todos'
  }
];

export const users = [
  {
    _id: 1,
    role_id: 0,
    isActive: true,
    isHidden: false,
    name_first: 'Anthony',
    name_last: 'Admin',
    username: 'tony.admin@xyz.com',
    hash: '$2b$10$9jJRjCb8l62p11aCSvNZL.10DhyGQ8lkLzMfGty0QkWN8gxtyWksK'
  },
  {
    _id: 2,
    role_id: 1,
    isActive: true,
    isHidden: false,
    name_first: 'Rebecca',
    name_last: 'Readall',
    username: 'becky@reads.edu',
    hash: '$2b$10$va86wr3nYhVT1.n1zymFQ.oH5iK1tBHfv3zbXcYz6v9zgMzwYNpnS'
  },
  {
    _id: 3,
    role_id: 2,
    isActive: true,
    isHidden: false,
    name_first: 'Ulysses',
    name_last: 'User',
    username: 'uly@abc.edu',
    hash: '$2b$10$PFrlQoQ2Kniy4stAcRzTue0Fe4DROmbJfDK28SfcAIAdcZyXutU8y'
  }
];

export const todos = [
  {
    _id: 1,
    user_id: 0,
    position: 2,
    isActive: true,
    isHidden: false,
    text: 'Set agenda for meeting'
  },
  {
    _id: 2,
    user_id: 0,
    position: 1,
    isActive: true,
    isHidden: false,
    text: 'Debug all code'
  },
  {
    _id: 3,
    user_id: 0,
    position: 0,
    isActive: true,
    isHidden: false,
    text: 'Submit for approvals'
  },
  {
    _id: 4,
    user_id: 1,
    position: 2,
    isActive: true,
    isHidden: false,
    text: 'Call about tests'
  },
  {
    _id: 5,
    user_id: 1,
    position: 1,
    isActive: true,
    isHidden: false,
    text: 'Gain historical perspective'
  },
  {
    _id: 6,
    user_id: 1,
    position: 0,
    isActive: true,
    isHidden: false,
    text: 'Go fight fire with info'
  }
];
