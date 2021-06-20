import React, { useEffect, useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { TRectData } from '../types';
import { useBoxMakerData, useCanvas, useUtils } from '../hooks';

const DrawArea = styled.canvas`
  width: 1000px;
  height: 100%;
  border: 2px dotted #000;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }

  ${(props) =>
    props.mode === 'DRAW'
      ? css`
          cursor: crosshair;
        `
      : null};
`;

const initialRectDataState = {
  x: 0,
  y: 0,
  w: 0,
  h: 0,
};

export default function DrawingBoard(): JSX.Element {
  const { canvasRef, drawRect, getCanvasPoint, clearRect, clearCanvas } =
    useCanvas();
  const {
    boxMakerPageData: { isDrawing, boxes, drawOptions },
    dispatch,
  } = useBoxMakerData();
  const [currentRectangleData, setCurrentRectangleData] =
    useState<TRectData>(initialRectDataState);
  const { findBoxInPoint, createBoxLocation } = useUtils();

  // Draw the boxes we have in the shared state.
  useEffect(() => {
    if ((!isDrawing && boxes.length) || drawOptions.mode === 'REMOVE') {
      clearCanvas();
      for (const { rectData, color } of boxes) {
        drawRect(rectData, { color, mode: drawOptions.mode });
      }
    }
  }, [drawRect, boxes, clearCanvas, isDrawing, drawOptions.mode]);

  const handleMouseDown = useCallback(
    (e) => {
      const currentCursorPoint = getCanvasPoint(e);

      if (!isDrawing && drawOptions.mode === 'DRAW') {
        setCurrentRectangleData({
          x: currentCursorPoint.x,
          y: currentCursorPoint.y,
          w: 0,
          h: 0,
        });

        dispatch({ type: 'TOGGLE_IS_DRAWING' });
      }

      if (drawOptions.mode === 'REMOVE') {
        const boxInClickedArea = findBoxInPoint(
          currentCursorPoint.x,
          currentCursorPoint.y
        );

        if (boxInClickedArea) {
          dispatch({
            type: 'REMOVE_BOX',
            payload: { boxId: boxInClickedArea.id },
          });
        }
      }
    },
    [getCanvasPoint, isDrawing, drawOptions.mode, dispatch, findBoxInPoint]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (isDrawing) {
        const currentCursorPoint = getCanvasPoint(e);

        const boxInCurrentArea = findBoxInPoint(
          currentCursorPoint.x,
          currentCursorPoint.y
        );

        clearRect(
          currentRectangleData.x,
          currentRectangleData.y,
          currentRectangleData.w,
          currentRectangleData.h
        );

        if (boxInCurrentArea) {
          drawRect(boxInCurrentArea.rectData, {
            color: boxInCurrentArea.color,
          });
        }

        const data = {
          x: currentRectangleData.x,
          y: currentRectangleData.y,
          w: currentCursorPoint.x - currentRectangleData.x,
          h: currentCursorPoint.y - currentRectangleData.y,
        };

        drawRect(data, {
          color: drawOptions.color,
        });
        setCurrentRectangleData((prevState) => ({
          ...prevState,
          w: currentCursorPoint.x - prevState.x,
          h: currentCursorPoint.y - prevState.y,
        }));
      }
    },
    [
      isDrawing,
      getCanvasPoint,
      findBoxInPoint,
      clearRect,
      currentRectangleData.x,
      currentRectangleData.y,
      currentRectangleData.w,
      currentRectangleData.h,
      drawRect,
      drawOptions.color,
    ]
  );

  const handleMouseUp = useCallback(
    (e) => {
      if (isDrawing) {
        const currentCursorPoint = getCanvasPoint(e);

        if (currentRectangleData.w !== 0 && currentRectangleData.h !== 0) {
          const newBox = {
            id: currentRectangleData.x + currentRectangleData.y,
            location: createBoxLocation(
              currentRectangleData.x,
              currentRectangleData.y,
              currentCursorPoint.x,
              currentCursorPoint.y
            ),
            color: drawOptions.color,
            rectData: currentRectangleData,
          };

          dispatch({ type: 'ADD_BOX', payload: { box: newBox } });
        } else {
          dispatch({ type: 'TOGGLE_IS_DRAWING' });
        }

        setCurrentRectangleData(initialRectDataState);
      }
    },
    [
      isDrawing,
      getCanvasPoint,
      currentRectangleData,
      createBoxLocation,
      drawOptions.color,
      dispatch,
    ]
  );

  return (
    <DrawArea
      ref={canvasRef}
      mode={drawOptions.mode}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
}
