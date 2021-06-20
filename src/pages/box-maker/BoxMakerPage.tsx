import React from 'react';
import { Flex, Box } from '@ofqwx/react-grid';
import {
  DrawingBoard,
  ActionPanel,
  BoxMakerDataProvider,
  CanvasProvider,
} from './components';
import styled from 'styled-components';

const ResponsiveFlex = styled(Flex)`
  @media only screen and (max-width: 600px) {
    flex-wrap: wrap;
  }
`;

const ResponsiveBox = styled(Box)`
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

export default function BoxMakerPage(): JSX.Element {
  return (
    <BoxMakerDataProvider>
      <CanvasProvider>
        <ResponsiveFlex justifyContent="center">
          <ResponsiveBox width="20%">
            <ActionPanel />
          </ResponsiveBox>

          <ResponsiveBox width="1000px">
            <DrawingBoard />
          </ResponsiveBox>
        </ResponsiveFlex>
      </CanvasProvider>
    </BoxMakerDataProvider>
  );
}
