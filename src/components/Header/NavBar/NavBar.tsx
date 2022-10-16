import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { spacing, BORDER_RADIUS, FONT, COLORS } from '@/theme';
import { useTabsInfo } from '@/hooks/useTabsInfo';

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${spacing(1)};
`;

const NavButton = styled(NavLink)`
  width: 220px;
  min-width: 180px;
  padding: ${spacing(1)};
  border-radius: ${BORDER_RADIUS.LG};
  border: 1px solid ${COLORS.FONT1};
  color: ${COLORS.FONT1};
  font-size: ${FONT.SIZE.SM};
  text-decoration: none;
  cursor: pointer;
  &:not(:last-of-type) {
    margin-right: ${spacing(1)};
  }
  &.active {
    background-color: ${COLORS.BG2};
  }
`;

function NavBar() {
  const { regular, special } = useTabsInfo();
  return (
    <Container>
      <NavButton to="/regular">Monthly/Weekly ({regular.total})</NavButton>
      <NavButton to="/special">Special Edition ({special.total})</NavButton>
    </Container>
  );
}

export default NavBar;
