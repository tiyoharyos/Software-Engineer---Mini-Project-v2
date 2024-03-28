import { Link, Outlet } from 'react-router-dom';
import Sidebar from './components/Navbar';
const SharedLayout = () => {
  return (
    <>
      <Sidebar />
      <section className='section'>
        <Outlet />
      </section>
    </>
  );
};
export default SharedLayout;