import React, { createContext, ReactNode, useReducer } from 'react';
import { TDrawAction, TBoxMakerDataProviderState } from '../types';
import { boxMakerPageReducer } from '../data';

const initialState = {
  isDrawing: false,
  drawOptions: {
    color: 'red',
    action: 'DRAW' as TDrawAction,
  },
  boxes: [],
};

export const BoxMakerDataProviderContext = createContext<any>({});

type TBoxMakerDataProvider = {
  children: ReactNode;
};

export default function BoxMakerDataProvider({
  children,
}: TBoxMakerDataProvider): JSX.Element {
  const [boxMakerPageData, dispatch] = useReducer(
    boxMakerPageReducer,
    initialState as TBoxMakerDataProviderState
  );

  return (
    <BoxMakerDataProviderContext.Provider
      value={{ boxMakerPageData, dispatch }}
    >
      {children}
    </BoxMakerDataProviderContext.Provider>
  );
}
