import React from 'react';
import { Flex, Box } from '@ofqwx/react-grid';
import {
  DrawingBoard,
  ActionPanel,
  BoxMakerDataProvider,
  CanvasProvider,
} from './components';

export default function BoxMakerPage(): JSX.Element {
  return (
    <BoxMakerDataProvider>
      <CanvasProvider>
        <Flex>
          <Box width="20%">
            <ActionPanel />
          </Box>

          <Box flexGrow={1}>
            <DrawingBoard />
          </Box>
        </Flex>
      </CanvasProvider>
    </BoxMakerDataProvider>
  );
}
