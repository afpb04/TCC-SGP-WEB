/* eslint-disable camelcase */
import React, { useMemo } from 'react';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Link } from 'react-router-dom';
import { Container, Content, Models, Model } from './styles';

import Button from '../../components/Button';
import Header from '../../components/Header';

const Dashboard: React.FC = () => {
  const day = useMemo(() => {
    return format(new Date(), "'Dia' dd 'de' MMMM", { locale: ptBR });
  }, []);
  const weekDay = useMemo(() => {
    return format(new Date(), 'cccc', { locale: ptBR });
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <Models>
          <h1>Modulos</h1>
          <p>
            <span>Hoje</span>
            <span>{day}</span>
            <span>{weekDay}</span>
          </p>

          <div>
            <Model>
              <strong>Pedidos</strong>
              <span>
                <Link to="/orders">
                  <Button type="button">Entrar</Button>
                </Link>
              </span>
            </Model>
            <Model>
              <strong>Caixa</strong>
              <span>
                <Link to="/">
                  <Button type="button">Entrar</Button>
                </Link>
              </span>
            </Model>
            <Model>
              <strong>Atendimento</strong>
              <span>
                <Link to="/">
                  <Button type="button">Entrar</Button>
                </Link>
              </span>
            </Model>
            <Model>
              <strong>Produtos</strong>
              <span>
                <Link to="/products">
                  <Button type="button">Entrar</Button>
                </Link>
              </span>
            </Model>
          </div>
        </Models>
      </Content>
    </Container>
  );
};
export default Dashboard;
