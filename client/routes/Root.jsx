import { Link } from 'react-router-dom';

function Root() {
  return (
    <>
      <h1>TODO App</h1>
      <div>list of TODOs go here</div>
      <Link to={'login'}>Log out</Link>
    </>
  );
}

export default Root;
