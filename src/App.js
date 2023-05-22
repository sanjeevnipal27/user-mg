import { Outlet } from 'react-router-dom';
import "./App.scss";
import AppNavbar from './components/navbar';

function App() {
  return (
    <>
      <AppNavbar />
      <Outlet />
    </>
  );
}

export default App;