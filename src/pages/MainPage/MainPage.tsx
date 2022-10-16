import React from 'react';
import styled from 'styled-components';
import Header from '@/components/Header';
import { COLORS } from '@/theme';
import { useIsDBReady } from '@/hooks/useIsDBReady';
import Loading from '@/components/Loading';
import PlaylistsGrid from '@/components/PlaylistsGrid';

const PageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.BG1};
  color: ${COLORS.FONT1};
`;

const PageContent = styled.div`
  background-color: ${COLORS.BG2};
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

function MainPage() {
  const isDBReady = useIsDBReady();
  return (
    <PageContainer>
      <Header />
      <PageContent>{isDBReady ? <PlaylistsGrid /> : <Loading />}</PageContent>
    </PageContainer>
  );
}

export default MainPage;
