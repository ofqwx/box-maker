import { useContext } from 'react';
import { BoxMakerDataProviderContext } from '../components';

export default function useBoxMakerData(): any {
  const boxMakerPageState = useContext(BoxMakerDataProviderContext);

  return boxMakerPageState;
}
