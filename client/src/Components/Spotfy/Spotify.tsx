import React, { useMemo } from 'react';
import { Box, LinearProgress } from '@mui/material';
import { convertToEmbedUrl, getGematria } from './utils/searchDay';
import BibleEpisodes from './BibleEpisodes.json';
import { Episode } from './BIbleEpisodes.type';

interface ISpotifyEmbedProps {
  book: string;
  chapter: string;
}

const SpotifyEmbed: React.FC<ISpotifyEmbedProps> = ({ book, chapter }) => {
  const url = useMemo(() => {
    const episodes = (BibleEpisodes as Record<string, Record<string, Episode>>)[book];
    const entry = episodes?.[getGematria(chapter).toString()];

    return convertToEmbedUrl(entry?.spotify);
  }, [book, chapter]);

  return !url ? (
    <LinearProgress />
  ) : (
    <Box display='flex' flexDirection='column'>
      <iframe
        src={url}
        width='400'
        height='300'
        frameBorder='0'
        // allowTransparency={true}
        allow='encrypted-media'
        title='Spotify Player'
      />
    </Box>
  );
};

export default SpotifyEmbed;
