import React from 'react';
import { DefaultLayout } from './layouts';
import { BoxMakerPage } from './pages';

function App(): JSX.Element {
  return (
    <DefaultLayout>
      <BoxMakerPage />
    </DefaultLayout>
  );
}

export default App;
