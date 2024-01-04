import { todos } from '../../schema/testData';

export default function Todos() {
  const listTodos = todos.map(todo => (
    <tr key={todo._id}>
      <td>
        {todos.isActive ? (
          <span className='cursor-pointer material-symbols-outlined'>check_box</span>
        ) : (
          <span className='cursor-pointer material-symbols-outlined'>check_box_outline_blank</span>
        )}
      </td>
      <td>{todo.text}</td>
      <td className='flex item-center'>
        <span className='cursor-pointer material-symbols-outlined'>edit</span>
      </td>
      <td>
        <span className='cursor-pointer material-symbols-outlined'>delete</span>
      </td>
    </tr>
  ));

  return (
    <div className='overflow-x-auto max-h-96 max-w-xl mx-auto shadow-xl'>
      <table className='table table-md'>
        <tbody>{listTodos}</tbody>
      </table>
    </div>
  );
}
