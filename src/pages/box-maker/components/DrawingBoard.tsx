import React, { useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import { TRectData } from '../types';
import { useBoxMakerData, useCanvas } from '../hooks';

const DrawArea = styled.canvas`
  width: 100%;
  height: 100%;
  border: 1px dotted #ff6f47;
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

  // Draw the boxes we have in the shared state.
  useEffect(() => {
    if (!isDrawing && boxes.length) {
      console.log(boxes);
      clearCanvas();
      for (const { rectData, color } of boxes) {
        drawRect(rectData, { color, action: drawOptions.action });
      }
    }
  }, [drawRect, boxes, clearCanvas, isDrawing, drawOptions.action]);

  const handleMouseDown = useCallback(
    (e) => {
      const currentCursorPoint = getCanvasPoint(e);

      if (!isDrawing && drawOptions.action === 'DRAW') {
        setCurrentRectangleData({
          x: currentCursorPoint.x,
          y: currentCursorPoint.y,
          w: 0,
          h: 0,
        });

        dispatch({ type: 'TOGGLE_IS_DRAWING' });
      }

      if (!isDrawing && drawOptions.action === 'REMOVE') {
        const boxInClickedArea = boxes.find(
          (box) =>
            currentCursorPoint.x >= box.location[0].x &&
            currentCursorPoint.y >= box.location[0].y &&
            currentCursorPoint.x <= box.location[1].x &&
            currentCursorPoint.y <= box.location[1].y
        );
          console.log(boxInClickedArea, {currentCursorPoint})
        if (boxInClickedArea) {
          dispatch({
            type: 'REMOVE_BOX',
            payload: { boxId: boxInClickedArea.id },
          });
        }
      }
    },
    [getCanvasPoint, isDrawing, drawOptions.action, dispatch, boxes]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (isDrawing) {
        const currentCursorPoint = getCanvasPoint(e);

        clearRect(
          currentRectangleData.x,
          currentRectangleData.y,
          currentRectangleData.w,
          currentRectangleData.h
        );

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
      drawOptions.color,
      getCanvasPoint,
      clearRect,
      currentRectangleData.x,
      currentRectangleData.y,
      currentRectangleData.w,
      currentRectangleData.h,
      drawRect,
    ]
  );

  const handleMouseUp = useCallback(
    (e) => {
      if (isDrawing) {
        const currentCursorPoint = getCanvasPoint(e);

        if (currentRectangleData.w > 0 && currentRectangleData.h > 0) {
          const newBox = {
            id: currentRectangleData.x + currentRectangleData.y,
            location: [
              { x: currentRectangleData.x, y: currentRectangleData.y },
              { x: currentCursorPoint.x, y: currentCursorPoint.y },
            ],
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
      drawOptions.color,
      dispatch,
    ]
  );

  return (
    <DrawArea
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
}
