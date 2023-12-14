// current not used
export const getUserTodos = user_id => `
query User {
  user(_id: ${user_id}) {
    todos {
      _id
      position
      isActive
      isHidden
      text
    }
  }
}`;

export const getAllTodos = () => `
query Todos {
  todos {
      _id
      user_id
      position
      isActive
      isHidden
      text
  }
}`;

export const addTodo = () => `
mutation AddTodo ($user_id: String!, $text: String!) {
  addTodo(user_id: $user_id, text: $text) {
      _id
      user_id
      position
      isActive
      isHidden
      text
  }
}`;

export const updateTodo = () => `
mutation UpdateTodo ($_id: String!, $action: String!, $text: String, $theOtherID: String) {
  updateTodo(_id: $_id, action: $action, text: $text, theOtherID: $theOtherID) {
      _id
      user_id
      position
      isActive
      isHidden
      text
  }
}`;
