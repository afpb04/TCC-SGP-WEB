/* eslint-disable no-use-before-define */
import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container type="submit" {...rest}>
    {loading ? 'Carregando...' : children}
  </Container>
);

export default Button;
