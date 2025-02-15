import React from 'react';
import styled from 'styled-components';
import { spacing, FONT } from '@/theme';
import NavBar from './NavBar';
import Announcement from './announcement';

const StyledHeader = styled.header`
  padding: ${spacing(2)};
  text-align: center;
`;

const Title = styled.div`
  font-size: ${FONT.SIZE.LG};
  font-weight: ${FONT.WEIGHT.SEMIBOLD};
  margin-bottom: ${spacing(1)};
`;

const SubTitle = styled.div`
  font-size: ${FONT.SIZE.SM};
  margin-bottom: ${spacing(2)};
  font-style: italic;
`;

function Header() {
  return (
    <>
      <StyledHeader>
        <Title>PLAYLISTS GALORE</Title>
        <SubTitle>A great collection of playlists!</SubTitle>
        <NavBar />
      </StyledHeader>
      <Announcement />
    </>
  );
}

export default Header;
