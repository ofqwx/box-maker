import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { IconContext } from 'react-icons';
import { motion } from 'framer-motion';

const Button = styled(motion.button)`
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};

  ${(props) => {
    if (props.type === 'primary') {
      return css`
        background-color: #ff6f47;
        color: #fff;
        padding: 20px;
        width: 100%;
        border: none;
      `;
    }

    if (props.type === 'secondary') {
      return css`
        background-color: #fff;
        color: #ff6f47;
        padding: 20px;
        width: 100%;
        border: 1px solid #ff6f47;
      `;
    }

    if (props.type === 'icon') {
      return css`
        background-color: #ff6f47;
        color: #fff;
        padding: 8px;
        width: 100%;
        border: none;
      `;
    }

    if (props.type === 'switch') {
      return css`
        cursor: pointer;
        background-color: ${props.selected ? '#ff6f47' : '#fff'};
        color: ${props.selected ? '#fff' : '#ff6f47'};
        padding: 8px;
        width: 100%;
        border: ${props.selected ? '1px solid #000' : '1px solid #ff6f47'};
      `;
    }
  }}
`;

type TButtonAnimationProps = {
  children: ReactNode;
  type?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

function AnimatedButton({
  children,
  ...props
}: TButtonAnimationProps): JSX.Element {
  if (props.disabled) {
    return <Button {...props}>{children}</Button>;
  }

  return (
    <Button whileTap={{ scale: 0.9 }} {...props}>
      {children}
    </Button>
  );
}

export default {
  /* eslint-disable */
  Primary: ({ children, ...props }) => (
    <AnimatedButton type="primary" {...props}>
      {children}
    </AnimatedButton>
  ),
  Switch: ({ children, ...props }) => (
    <AnimatedButton type="switch" selected={props.selected} {...props}>
      {children}
    </AnimatedButton>
  ),
  IconSwitch: ({ children, onClick, ...props }) => (
    <AnimatedButton
      type="switch"
      selected={props.selected}
      onClick={onClick}
      {...props}
    >
      <IconContext.Provider value={{ ...props }}>
        {children}
      </IconContext.Provider>
    </AnimatedButton>
  ),
  Secondary: ({ children, ...props }) => (
    <AnimatedButton type="secondary" {...props}>
      {children}
    </AnimatedButton>
  ),
  Icon: ({ children, onClick, ...props }) => (
    <AnimatedButton type="icon" onClick={onClick}>
      <IconContext.Provider value={{ ...props }}>
        {children}
      </IconContext.Provider>
    </AnimatedButton>
  ),
};
