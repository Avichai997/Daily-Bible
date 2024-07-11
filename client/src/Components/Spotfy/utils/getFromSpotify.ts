import axios from 'axios';
import { ISpotifySearchResponse } from './Spotify.types';

async function getAccessToken(clientId: string, clientSecret: string): Promise<string> {
  const encodedCredentials = btoa(`${clientId}:${clientSecret}`);
  const authUrl = 'https://accounts.spotify.com/api/token';
  const authHeader = `Basic ${encodedCredentials}`;

  const response = await axios.post(authUrl, 'grant_type=client_credentials', {
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data.access_token;
}

async function searchSpotify(accessToken: string, query: string) {
  const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=episode`;
  const response = await axios.get<ISpotifySearchResponse>(searchUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}

export async function getEpisodeUrl(bookName: string, chapterName: string): Promise<string | null> {
  const accessToken = await getAccessToken(
    '57b72e89e70a49119079233ddf04ae16',
    '9e3795a890d547399e2a48d5cac28f9f'
  );

  const query = `${bookName} ${chapterName}`;
  const searchResults = await searchSpotify(accessToken, query);

  if (searchResults?.episodes?.items?.length > 0) {
    const episode = searchResults.episodes.items[0];

    return episode.external_urls.spotify;
  }

  return null;
}

// example usage:
// const bookName = "שם הספר";
// const chapterName = "שם הפרק";

// getEpisodeUrl(bookName, chapterName).then((episodeUrl) => {
//     if (episodeUrl) {
//         console.log(`ה-URL של השיעור הוא: ${episodeUrl}`);
//     } else {
//         console.log("לא נמצא שיעור תואם.");
//     }
// }).catch((error) => {
//     console.error("שגיאה: ", error);
// });
