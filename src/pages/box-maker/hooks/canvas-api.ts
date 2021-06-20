import { TRectData, TRectOptions } from '../types';
import { useCallback, useEffect, useRef, MouseEvent } from 'react';

export type TCanvasApiState = {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | undefined>;
  drawRect: (data: TRectData, options?: TRectOptions) => void;
  getCanvasPoint: (event: MouseEvent) => any;
  clearCanvas: () => void;
  clearRect: (x: number, y: number, w: number, h: number) => void;
};

export default function useCanvasApi(): TCanvasApiState {
  const canvas = useRef<HTMLCanvasElement>();
  const canvasContext = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvas.current) {
      const canvasElement = canvas.current;

      canvasElement.width = canvasElement.clientWidth;
      canvasElement.height = canvasElement.clientHeight;

      // get context of the canvas
      canvasContext.current = canvasElement.getContext('2d');
    }
  }, []);

  const drawRect = useCallback((data: TRectData, options?: TRectOptions) => {
    if (canvasContext.current) {
      const { x, y, w, h } = data;

      const context = canvasContext.current;
      if (options?.mode === 'REMOVE') {
        context.globalAlpha = 0.3;
      }
      context.beginPath();
      context.rect(x, y, w, h);
      context.fillStyle = options?.color || '#000';
      context.fill();
      context.lineWidth = 1;
      context.strokeStyle = 'black';
      context.stroke();
      context.globalAlpha = 1;
    }
  }, []);

  const getCanvasPoint = useCallback((event: MouseEvent) => {
    if (canvas.current) {
      const canvasElement = canvas.current;
      const offsetLeft = canvasElement.offsetLeft;
      const offsetTop = canvasElement.offsetTop;

      return {
        x: event.pageX - offsetLeft,
        y: event.pageY - offsetTop,
      };
    }
  }, []);

  const clearCanvas = useCallback(() => {
    if (canvasContext.current && canvas.current) {
      const canvasElement = canvas.current;
      const context = canvasContext.current;

      context.clearRect(0, 0, canvasElement.width, canvasElement.height);
    }
  }, []);

  const clearRect = useCallback(
    (x: number, y: number, w: number, h: number) => {
      if (canvasContext.current) {
        /* 
          Since we are also drawing a border we need consider
          the width of the border when clearing the rect, and this depends
          on the direction at the user is drawing.
        */

        // Case of drawing to the top-right direction
        if (w > 0 && h < 0) {
          canvasContext.current.clearRect(x - 1, y + 1, w + 2, h - 2);
        }

        // Case of drawing to the top-left direction
        if (w < 0 && h < 0) {
          canvasContext.current.clearRect(x + 1, y + 1, w - 2, h - 2);
        }

        // Case of drawing to the bottom-left direction
        if (w < 0 && h > 0) {
          canvasContext.current.clearRect(x + 1, y - 1, w - 2, h + 2);
        }

        // Case of drawing to the bottom-right
        canvasContext.current.clearRect(x - 1, y - 1, w + 2, h + 2);
      }
    },
    []
  );

  return {
    canvasRef: canvas,
    drawRect,
    getCanvasPoint,
    clearCanvas,
    clearRect,
  };
}
