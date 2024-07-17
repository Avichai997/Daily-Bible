/* eslint-disable @cspell/spellchecker */
import { Outlet } from 'react-router-dom';
import Navbar from '@Components/Navbar';
import './Home.scss';
import { useState } from 'react';
import Sidebar from '@Components/Sidebar/Sidebar';
// import SpotifyEmbed from '@Components/Spotfy/Spotify';

const Home = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className='home_wrapper'>
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

export default Home;
