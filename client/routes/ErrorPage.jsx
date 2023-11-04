import { useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();
  const message = error.status ? `${error.status} ${error.statusText}` : error.message;
  console.error(error);

  return (
    <>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{message}</i>
      </p>
    </>
  );
}

export default ErrorPage;
