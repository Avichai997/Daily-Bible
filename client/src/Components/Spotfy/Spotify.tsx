import React, { useEffect, useState } from 'react';
import { getBookAndChapters } from './utils/searchDay';

interface SpotifyEmbedProps {
  embedUrl: string;
}

const SpotifyEmbed: React.FC<SpotifyEmbedProps> = ({ embedUrl }) => {
  const [data, setData] = useState<{ book: any; chapters: any; }>();
  
  useEffect(() => {
    fetch('/output.json')
      .then((response) => response.json())
      .then((data) => {
        const result = getBookAndChapters(data, 'תשע"ח', 'סיון', 'ו');
        console.log(result);
        setData(result || undefined);
      })
      .catch((error) => {
        console.error('Error loading JSON data:', error);
      });
  }, []);

  const getBookAndChapters = (data: any, year: string, month: string, day: string) => {
    const entry = data.find((item: { year: string; month: string; day: string }) => item.year === year && item.month === month && item.day === day);
    if (entry) {
      return {
        book: entry.book,
        chapters: entry.chapters,
      };
    } else {
      return null;
    }
  };
  return (
    <div>
      <iframe
        src={embedUrl}
        width='500'
        height='200'
        frameBorder='0'
        allowTransparency={true}
        allow='encrypted-media'
        title='Spotify Player'
      ></iframe>
    </div>
  );
};

export default SpotifyEmbed;
