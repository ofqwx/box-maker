export type TRectData = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type TRectOptions = {
  color?: string;
  action?: string;
};

export type TDrawAction = 'DRAW' | 'REMOVE';

export type TDrawOptions = {
  color: string;
  action: TDrawAction;
};

type TCoordinate = {
  x: number;
  y: number;
};

type TBoxLocation = [TCoordinate, TCoordinate];

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
