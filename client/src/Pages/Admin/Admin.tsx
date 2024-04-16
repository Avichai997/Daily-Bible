import { Outlet } from 'react-router-dom';
import Navbar from '@Components/Navbar';
import './Admin.scss';
import { useState } from 'react';
import Sidebar from '@Components/Sidebar/Sidebar';

const Admin = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className='admin_wrapper'>
      <Sidebar />
      <div className='container'>
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className='screenContainer' onClick={() => isOpen && setIsOpen(!isOpen)}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
