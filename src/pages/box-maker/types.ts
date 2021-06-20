export type TRectData = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type TRectOptions = {
  color?: string;
  mode?: string;
};

export type TDrawMode = 'DRAW' | 'REMOVE';

export type TDrawOptions = {
  color: string;
  mode: TDrawMode;
};

type TCoordinate = {
  x: number;
  y: number;
};

export type TBoxLocation = [TCoordinate, TCoordinate];

export type TBox = {
  id: number;
  location: TBoxLocation;
  color: string;
  rectData: TRectData;
};

export type TBoxMakerDataProviderState = {
  drawOptions: TDrawOptions;
  isDrawing: boolean;
  boxes: TBox[] | [];
  canvasContext?: CanvasRenderingContext2D;
};
