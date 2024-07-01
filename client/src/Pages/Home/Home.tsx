import { Outlet } from 'react-router-dom';
import Navbar from '@Components/Navbar';
import './Home.scss';
import { useState } from 'react';
import Sidebar from '@Components/Sidebar/Sidebar';
import SpotifyEmbed from '@Components/Spotfy/Spotify';

const Home = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const chapter = '165XuxrRmrvNEd0QAfWbEv'
  const embedUrl = `https://open.spotify.com/embed/episode/${chapter}?utm_source=generator&t=0 `
 
  return (
    <div className='home_wrapper'>
      <Sidebar />
      <div className='container'>
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className='screenContainer' onClick={() => isOpen && setIsOpen(!isOpen)}>
          <Outlet />
        </div>
        <div>
      <SpotifyEmbed embedUrl={embedUrl} />
    </div>
      </div>
    </div>
  );
};

export default Home;
