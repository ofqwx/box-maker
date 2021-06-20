import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { Flex, Box } from '@ofqwx/react-grid';
import { Button } from '../../../atoms';
import { FaPlus, FaMinus } from 'react-icons/fa';
import styled from 'styled-components';
import { useBoxMakerData, useCanvas } from '../hooks';
import images from '../../../assets/images';

const ToolBoxWrapper = styled(Box)`
  border: 1px solid #ff6f47;
  border-radius: 1%;
`;

const LogoWrapper = styled(Box)`
  h2 {
    margin: 0;
    text-align: right;
  }
`;

export const drawMode = {
  draw: 'DRAW',
  remove: 'REMOVE',
};

export default function ActionPanel(): JSX.Element {
  const { boxMakerPageData, dispatch } = useBoxMakerData();
  const { clearCanvas } = useCanvas();
  const [colors, setColors] = useState(['red', 'blue', 'orange']);

  useEffect(() => {
    // If there is not boxes drawed, switch to draw mode
    if (!boxMakerPageData.boxes.length) {
      dispatch({
        type: 'SET_DRAW_MODE',
        payload: {
          drawMode: drawMode.draw,
        },
      });
    }
  }, [boxMakerPageData.boxes.length, dispatch]);

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
    <Flex direction="column">
      <LogoWrapper padding={{ left: 0, bottom: '32px' }}>
        <img alt="" src={images.logo} />
        <h2>Box maker</h2>
      </LogoWrapper>

      <ToolBoxWrapper height="auto">
        <Flex direction="column" justifyContent="space-between">
          <Flex direction="column">
            <Box>
              <Flex>
                <Box>
                  <Button.Switch
                    selected={
                      boxMakerPageData.drawOptions.mode === drawMode.draw
                    }
                    onClick={() =>
                      dispatch({
                        type: 'SET_DRAW_MODE',
                        payload: {
                          drawMode: drawMode.draw,
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
                      boxMakerPageData.drawOptions.mode === drawMode.remove
                    }
                    onClick={() =>
                      dispatch({
                        type: 'SET_DRAW_MODE',
                        payload: {
                          drawMode: drawMode.remove,
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
                {boxMakerPageData.drawOptions.mode === drawMode.draw ? (
                  <Fragment>
                    {colors.map((color) => (
                      <Box key={color}>
                        <ColorBox
                          className="colorBoxButton"
                          color={color}
                          highlight={
                            boxMakerPageData.drawOptions.color === color
                          }
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
                      <ColorBox
                        id="addColorButton"
                        highlight
                        color="#fff"
                        onClick={addColor}
                      >
                        <FaPlus size="1.5em" />
                      </ColorBox>
                    </Box>
                  </Fragment>
                ) : (
                  <Box>
                    <p>
                      Please click the box from the board you would like to
                      remove
                    </p>
                  </Box>
                )}
              </Flex>
            </Box>
          </Flex>

          <Box className="footer">
            <Flex direction="column">
              <Box>{boxMakerPageData.boxes.length} Elements</Box>

              <Button.Primary onClick={reset}>Clear</Button.Primary>
            </Flex>
          </Box>
        </Flex>
      </ToolBoxWrapper>

      {!boxMakerPageData.boxes.length ? (
        <Box padding="0">
          <p>
            Pick a color from the toolbox and start drawing your boxes on the board.
          </p>
        </Box>
      ) : null}
    </Flex>
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
