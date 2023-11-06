export const getTodos = user_id => `
query User {
  user(_id: ${user_id}) {
    todos {
      isActive
      isHidden
      text
      _id
    }
  }
}`;
