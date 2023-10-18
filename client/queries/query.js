export const getSessionInfo = session_id => `
query Session {
  session(_id: "${session_id}") {
    _id
    expires
    user {
      _id
      isActive
      isHidden
      name_first
      name_last
      username
      password
      role {
        _id
        name
        description
      }
    }
  }
}`;

export const getUserInfo = (username, password) => `
query User {
  user(username: "${username}", password: "${password}") {
    _id
    role_id
    isActive
    isHidden
    name_first
    name_last
    username
    password
    role {
      _id
      name
      description
    }
    error
  }
}`;
