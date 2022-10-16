import React from 'react';
import styled from 'styled-components';
import { Playlist } from '@/types';
import { BORDER_RADIUS, COLORS, FONT, spacing } from '@/theme';
import SpotifyIcon from './SpotifyIcon';
import YoutubeMusicIcon from './YoutubeMusicIcon';
import DeezerIcon from './DeezerIcon';
import TidalIcon from './TidalIcon';
// import AppleMusicIcon from './AppleMusicIcon';

const Container = styled.div`
  background-color: ${COLORS.BG1};
  border-radius: ${BORDER_RADIUS.LG};
  padding: ${spacing(2)};
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  height: 50px;
  font-size: ${FONT.SIZE.BASE};
  font-weight: ${FONT.WEIGHT.SEMIBOLD};
  text-align: center;
  margin-bottom: ${spacing(1)};
  user-select: none;
  text-transform: capitalize;
  // 2 lines clamp
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
`;

const ImageContainer = styled.div`
  flex: 1;
  & img {
    object-fit: contain;
    width: 100%;
  }
`;

const TracksTotal = styled.div`
  font-size: ${FONT.SIZE.SM};
  text-align: center;
  margin-bottom: ${spacing(1)};
`;

const RightContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: ${spacing(2)}; ;
`;

const LinksContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Link = styled.a`
  width: 40px;
  height: 40px;
`;

type Props = {
  playlist: Playlist;
};

function Card({ playlist }: Props) {
  // 640*640, 300*300, 60*60
  // When artists get remove from spotify, spotify will send only one picture, or no picture at all...
  const url = playlist.images[1]?.url || playlist.images[0]?.url || '';
  return (
    <Container>
      <Title>{playlist.name.replaceAll('"', '')}</Title>

      <Content>
        <ImageContainer>
          <img src={url} alt="cover art" />
        </ImageContainer>
        <RightContainer>
          <TracksTotal>{`${playlist.totalTracks} tracks`}</TracksTotal>
          <LinksContainer>
            <div title="Spotify">
              <Link
                href={playlist.url.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SpotifyIcon />
              </Link>
            </div>
            <div title="Youtube Music">
              <Link
                href={playlist.url.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <YoutubeMusicIcon />
              </Link>
            </div>
            <div title="Deezer">
              <Link
                href={playlist.url.deezer}
                target="_blank"
                rel="noopener noreferrer"
              >
                <DeezerIcon />
              </Link>
            </div>
            <div title="Tidal">
              <Link
                href={playlist.url.tidal}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TidalIcon />
              </Link>
            </div>
            {/* <div title="Apple Music">
              <Link
                href={playlist.url.apple}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AppleMusicIcon />
              </Link>
            </div> */}
          </LinksContainer>
        </RightContainer>
      </Content>
    </Container>
  );
}

export default Card;
