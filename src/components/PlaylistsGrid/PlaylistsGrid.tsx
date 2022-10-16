import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { spacing } from '@/theme';
import { isTab, Playlist } from '@/types';
import { useParams } from 'react-router-dom';
import { readPage } from '@/modules/indexDB';
import Card from './Card';
import Pagination from './Pagination';

const GridContainer = styled.div`
  flex: 1;
`;

const Grid = styled.div`
  max-width: 1600px;
  width: 100%;
  padding: 0 ${spacing(2)};
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, 340px);
  grid-gap: ${spacing(4)};
`;

function PlaylistsGrid() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const { page, tab } = useParams();

  useEffect(() => {
    async function readPageFromDB() {
      if (page && tab && isTab(tab)) {
        const res = await readPage(parseInt(page), tab);
        setPlaylists(res);
      } else {
        console.error('error while reading page from DB', { page, tab });
      }
    }
    readPageFromDB();
  }, [page, tab]);

  return (
    <>
      <Pagination />
      <GridContainer>
        <Grid>
          {playlists.map((p) => (
            <Card key={p.name} playlist={p} />
          ))}
        </Grid>
      </GridContainer>
      <Pagination />
    </>
  );
}

export default PlaylistsGrid;
