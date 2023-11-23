export const getTodos = user_id => `
query User {
  user(_id: ${user_id}) {
    todos {
      _id
      order
      isActive
      isHidden
      text
    }
  }
}`;

export const addTodo = () => `
mutation AddTodo ($user_id: String!, $text: String!) {
  addTodo(user_id: $user_id, text: $text) {
      _id
      order
      isActive
      isHidden
      text
  }
}`;
