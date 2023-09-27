module.exports.todos = [
  {
    _id: 0,
    owner_id: 0,
    isActive: true,
    isHidden: false,
    text: "Set agenda for meeting",
  },
];

module.exports.roles = [
  { _id: 0, name: "admin", description: "full read/write access to all todos" },
  { _id: 1, name: "readAll", description: "read only access to all todos" },
  { _id: 2, name: "user", description: "only read/write to their todos" },
];

module.exports.sessions = [];

module.exports.users = [
  {
    _id: 0,
    role_id: 0,
    session_id: 0x0,
    isActive: true,
    name: { last: "Admin", first: "Anthony" },
    username: "tony.admin@xyz.com",
    password: "password",
  },
  {
    _id: 0,
    role_id: 1,
    session_id: 0x8,
    isActive: true,
    name: { last: "Readall", first: "Rebecca" },
    username: "becky@reads.edu",
    password: "password",
  },
  {
    _id: 0,
    role_id: 2,
    session_id: 0xf,
    isActive: true,
    name: { last: "User", first: "Ulysses" },
    username: "uly@abc.edu",
    password: "password",
  },
];
