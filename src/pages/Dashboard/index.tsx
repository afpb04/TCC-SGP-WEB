import React from 'react';
import { isToday } from 'date-fns';

import { FiClock, FiPower } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Orders,
  NextOrders,
  Section,
  Order,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoDelivery" />

          <Profile>
            <img
              src="https://avatars2.githubusercontent.com/u/15930084?s=460&u=00e846aa1cc7943cca6769dccbe301ef0815f1c8&v=4"
              alt={user.name}
            />

            <div>
              <span>Bem-vindo</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Orders>
          <h1>Pedidos</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 05</span>
            <span>Segunda-terça</span>
          </p>
          <NextOrders>
            <strong>Pedido da vez</strong>
            <div>
              <img
                src="https://avatars2.githubusercontent.com/u/15930084?s=460&u=00e846aa1cc7943cca6769dccbe301ef0815f1c8&v=4"
                alt="Pedido"
              />
              <strong>X-buger</strong>
              <span>
                <FiClock />
                22:59
              </span>
            </div>
          </NextOrders>
          <Section>
            <strong>Próximos Pedidos</strong>
            <Order>
              <span>
                <FiClock />
                23:30
              </span>
              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/15930084?s=460&u=00e846aa1cc7943cca6769dccbe301ef0815f1c8&v=4"
                  alt="Pedido"
                />
                <strong>X-buger</strong>
              </div>
            </Order>
            <Order>
              <span>
                <FiClock />
                23:30
              </span>
              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/15930084?s=460&u=00e846aa1cc7943cca6769dccbe301ef0815f1c8&v=4"
                  alt="Pedido"
                />
                <strong>X-buger</strong>
              </div>
            </Order>
          </Section>
        </Orders>
      </Content>
    </Container>
  );
};
export default Dashboard;
