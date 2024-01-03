import { todos } from '../../schema/testData';

export default function Todos() {
  const listTodos = todos.map(todo => (
    <tr key={todo._id}>
      <td>{todo.text}</td>
    </tr>
  ));

  return (
    <div className='overflow-x-auto max-h-96 max-w-xl mx-auto shadow-xl'>
      <table className='table table-pin-rows'>
        <thead>
          <tr>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{listTodos}</tbody>
      </table>
    </div>
  );
}
