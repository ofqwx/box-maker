import { useCallback } from 'react';
import { TBox, TBoxLocation } from '../types';
import { useBoxMakerData } from '.';

type TUtils = {
  findBoxInPoint: (x: number, y: number) => TBox | undefined;
  createBoxLocation: (
    initialX: number,
    initialY: number,
    currentX: number,
    currentY: number
  ) => TBoxLocation;
};

export default function useUtils(): TUtils {
  const {
    boxMakerPageData: { boxes },
  } = useBoxMakerData();

  const findBoxInPoint = useCallback(
    (x: number, y: number) => {
      return boxes
        .reverse()
        .find(
          (box) =>
            x >= box.location[0].x &&
            y >= box.location[0].y &&
            x <= box.location[1].x &&
            y <= box.location[1].y
        );
    },
    [boxes]
  );

  const createBoxLocation = useCallback(
    (
      initialX: number,
      initialY: number,
      currentX: number,
      currentY: number
    ): TBoxLocation => {
      // Case of drawing to the top-right direction
      if (currentX > initialX && currentY < initialY) {
        return [
          { x: initialX, y: currentY },
          { x: currentX, y: initialY },
        ];
      }

      // Case of drawing to the bottom-left direction
      if (currentX < initialX && currentY > initialY) {
        return [
          { x: currentX, y: initialY },
          { x: initialX, y: currentY },
        ];
      }

      // Case of drawing to the top-left direction
      if (currentX < initialX && currentY < initialY) {
        return [
          { x: currentX, y: currentY },
          { x: initialX, y: initialY },
        ];
      }

      // Case of drawing to the bottom-right
      return [
        { x: initialX, y: initialY },
        { x: currentX, y: currentY },
      ];
    },
    []
  );

  return {
    findBoxInPoint,
    createBoxLocation,
  };
}
