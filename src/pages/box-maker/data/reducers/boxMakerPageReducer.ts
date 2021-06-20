import {
  TBoxMakerDataProviderState,
  TDrawOptions,
  TDrawMode,
  TBox,
} from '../../types';

type TBoxMakerPageReducerActionType =
  | 'SET_DRAW_MODE'
  | 'SET_DRAW_COLOR'
  | 'ADD_BOX'
  | 'REMOVE_BOX'
  | 'REMOVE_ALL_BOXES'
  | 'TOGGLE_IS_DRAWING';

type TBoxMakerPageReducerPayload = {
  drawOptions?: TDrawOptions;
  drawMode?: TDrawMode;
  drawColor?: string;
  box?: TBox;
  boxId?: number;
};

type TBoxMakerPageReducerAction = {
  type: TBoxMakerPageReducerActionType;
  payload: TBoxMakerPageReducerPayload;
};

export default function boxMakerPageReducer(
  state: TBoxMakerDataProviderState,
  action: TBoxMakerPageReducerAction
): TBoxMakerDataProviderState {
  switch (action.type) {
    case 'TOGGLE_IS_DRAWING':
      return {
        ...state,
        isDrawing: !state.isDrawing,
      };
    case 'SET_DRAW_MODE':
      return {
        ...state,
        drawOptions: {
          ...state.drawOptions,
          mode: action.payload.drawMode ?? state.drawOptions.mode,
        },
      };
    case 'SET_DRAW_COLOR':
      return {
        ...state,
        drawOptions: {
          ...state.drawOptions,
          color: action.payload.drawColor ?? state.drawOptions.color,
        },
      };
    case 'ADD_BOX':
      return {
        ...state,
        isDrawing: false,
        boxes: action.payload.box
          ? [...state.boxes, action.payload.box]
          : [...state.boxes],
      };
    case 'REMOVE_BOX':
      return {
        ...state,
        boxes: action.payload.boxId
          ? state.boxes.filter((box) => box?.id !== action.payload.boxId)
          : [...state.boxes],
      };
    case 'REMOVE_ALL_BOXES':
      return {
        ...state,
        boxes: [],
      };
    default:
      console.error(
        `Unknown action ${action.type} when calling boxMakerPageReducer.`
      );
      return state;
  }
}
