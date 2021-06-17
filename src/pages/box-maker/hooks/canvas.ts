import { useContext } from 'react';
import { CanvasContext } from '../components';
import { TCanvasApiState } from './canvas-api';

export default function useCanvas(): TCanvasApiState {
  const canvasApi = useContext(CanvasContext);

  return canvasApi;
}
