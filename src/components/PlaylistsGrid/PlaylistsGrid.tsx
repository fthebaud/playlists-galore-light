import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { spacing } from '@/theme';
import { isTab, Playlist } from '@/types';
import { useNavigate, useParams } from 'react-router-dom';
import { readPage } from '@/modules/indexDB';
import { useTabsInfo } from '@/hooks/useTabsInfo';
import { TABS } from '@/config';
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
  const { regular, special } = useTabsInfo();
  const navigate = useNavigate();
  const { page, tab } = useParams();
  const requestedPage = page ? parseInt(page) : 0;

  useEffect(() => {
    async function readPageFromDB() {
      if (tab && isTab(tab)) {
        const res = await readPage(requestedPage, tab);
        setPlaylists(res);
      } else {
        console.error('error while reading page from DB', {
          requestedPage,
          tab,
        });
      }
    }
    readPageFromDB();
  }, [requestedPage, tab]);

  if (tab === TABS.regular && requestedPage > regular.pageCount) {
    navigate('/404');
  }
  if (tab === TABS.special && requestedPage > special.pageCount) {
    navigate('/404');
  }

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
