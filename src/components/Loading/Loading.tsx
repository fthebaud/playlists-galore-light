import React from 'react';
import { Waveform } from '@uiball/loaders';
import styled from 'styled-components';
import { COLORS, spacing } from '@/theme';

const LoadingContainer = styled.div`
  margin-top: ${spacing(10)};
`;

function Loading() {
  return (
    <LoadingContainer>
      <Waveform size={60} color={COLORS.FONT1} />
    </LoadingContainer>
  );
}

export default Loading;
