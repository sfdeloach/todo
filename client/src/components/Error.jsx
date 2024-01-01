import { useRouteError, Link } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id='error-page' className='hero min-h-screen'>
      <div className='hero-content text-center bg-base-300 p-24 rounded-3xl'>
        <div className='max-w-md'>
          <h1 className='text-5xl font-bold'>Oops!</h1>
          <p className='py-6'>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
          <Link
            to='/'
            className='btn btn-primary mt-6 rounded-md text-slate-300 hover:text-slate-100'>
            Return to safety
          </Link>
        </div>
      </div>
    </div>
  );
}
