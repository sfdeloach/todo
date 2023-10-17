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
