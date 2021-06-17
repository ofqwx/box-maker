import React, { Fragment, useState, useCallback } from 'react';
import { Flex, Box } from '@ofqwx/react-grid';
import { Button } from '../../../atoms';
import { FaPlus, FaMinus } from 'react-icons/fa';
import styled from 'styled-components';
import { useBoxMakerData, useCanvas } from '../hooks';

const Wrapper = styled.div`
  height: 100%;
  border: 1px solid #ff6f47;
`;

export const drawActions = {
  draw: 'DRAW',
  remove: 'REMOVE',
};

export default function ActionPanel(): JSX.Element {
  const { boxMakerPageData, dispatch } = useBoxMakerData();
  const { clearCanvas } = useCanvas();
  const [colors, setColors] = useState(['red', 'blue', 'orange']);

  const addColor = useCallback(
    () =>
      setColors((prevState) => [
        ...prevState,
        '#' + Math.floor(Math.random() * 16777215).toString(16),
      ]),
    []
  );

  const reset = useCallback(() => {
    clearCanvas();
    dispatch({ type: 'REMOVE_ALL_BOXES' });
  }, [clearCanvas, dispatch]);

  return (
    <Wrapper>
      <Flex direction="column" justifyContent="space-between">
        <Flex direction="column" padding="0">
          <Box>
            <Flex>
              <Box>
                <Button.Switch
                  selected={
                    boxMakerPageData.drawOptions.action === drawActions.draw
                  }
                  onClick={() =>
                    dispatch({
                      type: 'SET_DRAW_ACTION',
                      payload: {
                        drawAction: drawActions.draw,
                      },
                    })
                  }
                >
                  <FaPlus />
                </Button.Switch>
              </Box>

              <Box>
                <Button.Switch
                  disabled={!boxMakerPageData.boxes.length}
                  selected={
                    boxMakerPageData.drawOptions.action === drawActions.remove
                  }
                  onClick={() =>
                    dispatch({
                      type: 'SET_DRAW_ACTION',
                      payload: {
                        drawAction: drawActions.remove,
                      },
                    })
                  }
                >
                  <FaMinus />
                </Button.Switch>
              </Box>
            </Flex>
          </Box>

          <Box>
            <Flex wrap="wrap">
              {boxMakerPageData.drawOptions.action === drawActions.draw ? (
                <Fragment>
                  {colors.map((color) => (
                    <Box key={color}>
                      <ColorBox
                        color={color}
                        highlight={boxMakerPageData.drawOptions.color === color}
                        onClick={() =>
                          dispatch({
                            type: 'SET_DRAW_COLOR',
                            payload: {
                              drawColor: color,
                            },
                          })
                        }
                      />
                    </Box>
                  ))}

                  <Box>
                    <ColorBox highlight color="#fff" onClick={addColor}>
                      <FaPlus size="1.5em" />
                    </ColorBox>
                  </Box>
                </Fragment>
              ) : (
                <Box>
                  Please click the box from the board you would like to remove
                </Box>
              )}
            </Flex>
          </Box>
        </Flex>

        <Box>
          <Flex direction="column">
            <Box>{boxMakerPageData.boxes.length} Elements</Box>

            <Button.Primary onClick={reset}>Clear</Button.Primary>
          </Flex>
        </Box>
      </Flex>
    </Wrapper>
  );
}

const ColorBox = styled.div`
  background-color: ${(props) => props.color};
  opacity: ${(props) => (props.highlight ? '1' : '0.3')};
  cursor: pointer;
  color: #ff6f47;
  height: 1.5em;
  width: 1.5em;
  border: ${(props) => (props.highlight ? '1px solid #000' : 'none')};
`;
