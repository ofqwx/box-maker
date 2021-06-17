import { TRectData, TRectOptions } from '../types';
import { useCallback, useEffect, useRef, MouseEvent } from 'react';
import { useBoxMakerData } from '.';

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
  const {
    boxMakerPageData: { drawOptions },
  } = useBoxMakerData();

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
      context.beginPath();
      context.fillStyle = options?.color || '#000';
      context.fillRect(x, y, w, h);

      if (options?.action === 'REMOVE') {
        context.globalAlpha = 0.1;
        context.fillStyle = '#fff';
        context.fillRect(x, y, w, h);
        context.stroke();
      }
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

      context.clearRect(0, 0, canvasElement.width, canvasElement?.height);
    }
  }, []);

  const clearRect = useCallback(
    (x: number, y: number, w: number, h: number) => {
      if (canvasContext.current) {
        canvasContext.current.clearRect(x, y, w, h);
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
