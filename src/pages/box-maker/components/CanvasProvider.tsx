import React, { createContext, ReactNode } from 'react';
import { useCanvasApi } from '../hooks';

export const CanvasContext = createContext<any>({});

type TCanvasProviderProps = {
  children: ReactNode;
};

export default function CanvasProvider({
  children,
}: TCanvasProviderProps): JSX.Element {
  const canvasApi = useCanvasApi();

  return (
    <CanvasContext.Provider value={canvasApi}>
      {children}
    </CanvasContext.Provider>
  );
}
