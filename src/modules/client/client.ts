import axios from 'axios';
import { PlaylistsResponse } from '@/types';

// TODO hash in playlists.json filename or find a way to prevent caching
// fetch all playlists from public/data/playlists.json
export async function fetchAllPlaylists(): Promise<PlaylistsResponse> {
  const { data } = await axios.get<PlaylistsResponse>(
    `${window.location.origin}/data/playlists-202212111300.json`
  );
  return data;
}
