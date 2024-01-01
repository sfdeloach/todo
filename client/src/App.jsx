import Navbar from './components/Navbar';
import './App.css';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
