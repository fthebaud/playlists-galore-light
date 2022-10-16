import axios from 'axios';
import { PlaylistsResponse } from '@/types';

// fetch all playlists from public/data/playlists.json
export async function fetchAllPlaylists(): Promise<PlaylistsResponse> {
  const { data } = await axios.get<PlaylistsResponse>(
    `${window.location.origin}/data/playlists.json`
  );
  return data;
}
