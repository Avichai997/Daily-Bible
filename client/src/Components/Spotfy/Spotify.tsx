import React, { useEffect, useState } from 'react';
import { convertToEmbedUrl, getGematria } from './utils/searchDay';
import BibleEpisodes from './BibleEpisodes.json';
import { Box } from '@mui/material';

interface SpotifyEmbedProps {
  book: string;
  chapter: string;
}

const SpotifyEmbed: React.FC<SpotifyEmbedProps> = ({ book, chapter }) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (book && chapter) {
      findChapter(book, getGematria(chapter));
    }
  }, [book, chapter]);

  const findChapter = (book: string, chapter: number) => {
    const episodes = (BibleEpisodes as any)[book];
    if (!episodes) {
      return null;
    }

    const entry = episodes[chapter.toString()];
    console.log(entry);
    if (entry) {
      setUrl(convertToEmbedUrl(entry.spotify));
    }
  };

  return (
    <Box display='flex' flexDirection='column'>
      <iframe
        src={url}
        width='500'
        height='200'
        frameBorder='0'
        // allowTransparency={true}
        allow='encrypted-media'
        title='Spotify Player'
      ></iframe>
    </Box>
  );
};

export default SpotifyEmbed;
