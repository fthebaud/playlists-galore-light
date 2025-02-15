import React from 'react';
import styled from 'styled-components';

const Container = styled('div')({
  backgroundColor: 'indianRed',
  padding: '0.5rem',
  textAlign: 'center',
  color: 'white',
});

function Announcement() {
  return (
    <Container>
      <div>Site has moved! Find us on:</div>
      <a href="https://playlists-galore.com">playlists-galore.com</a>
    </Container>
  );
}

export default Announcement;
