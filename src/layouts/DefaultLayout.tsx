import React, { ReactNode } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

type TDefaultLayoutProps = {
  children: ReactNode;
};

const Wrapper = styled.div`
  height: 100%;
`;

const GlobalStyles = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    margin: 0;
    height: 100%;
    font-family: 'Roboto', sans-serif;
  }

  #root {
    height: 100%;
  }
`;

export default function DefaultLayout({
  children,
}: TDefaultLayoutProps): JSX.Element {
  return (
    <Wrapper>
      <GlobalStyles />
      {children}
    </Wrapper>
  );
}
