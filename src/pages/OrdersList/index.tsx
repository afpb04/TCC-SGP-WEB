/* eslint-disable camelcase */
import React, { useEffect, useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { FiClock } from 'react-icons/fi';
import {
  Container,
  Content,
  Orders,
  NextOrders,
  Section,
  Product,
} from './styles';

import api from '../../services/api';
import Button from '../../components/Button';
import Header from '../../components/Header';

interface IProducts {
  id: string;
  name: string;
  description: string;
  img: string;
}

interface IOrdersProducts {
  id: string;
  totals: number;
  amount: number;
  product: IProducts;
  created_at: string;
}

interface IOrders {
  id: string;
  totals: number;
  isfinished: boolean;
  ordersProducts: [IOrdersProducts];
}

interface ITables {
  id: string;
  name: string;
  available: boolean;
  updated_at: string;
  dateFormatted: string;
  orders: [IOrders];
}

const OrdersList: React.FC = () => {
  const [tables, setTables] = useState<ITables[]>([]);

  useEffect(() => {
    api.get<ITables[]>('/table').then((response) => {
      const tablesFormtted = response.data.map((table) => {
        return {
          ...table,
          dateFormatted: format(parseISO(table.updated_at), 'HH:mm'),
        };
      });
      setTables(tablesFormtted);
    });
  }, []);

  const tableNotAvailable = useMemo(() => {
    return tables.filter(
      (table) => table.available === false && table.orders.length > 0,
    );
  }, [tables]);

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
        <Orders>
          <h1>Pedidos</h1>
          <p>
            <span>Hoje</span>
            <span>{day}</span>
            <span>{weekDay}</span>
          </p>

          {tableNotAvailable.length === 0 && <p>Nenhum pedido</p>}

          {tableNotAvailable.map((table) => {
            return (
              <div key={table.id}>
                <NextOrders>
                  <div>
                    <strong>{table.name}</strong>
                    <span>
                      <FiClock />
                      {table.dateFormatted}
                    </span>
                  </div>
                </NextOrders>
                <Section>
                  <strong>Lista de pedidos</strong>
                  {table.orders
                    .filter((order) => order.isfinished !== true)
                    .map((orders) => {
                      if (orders.ordersProducts.length < 1) {
                        return <p>Nenhum item pedido no momento </p>;
                      }
                      return orders.ordersProducts.map((ordersProducts) => (
                        <Product key={ordersProducts.id}>
                          <span>
                            <FiClock />
                            {format(
                              parseISO(ordersProducts.created_at),
                              'HH:mm',
                            )}
                          </span>
                          <div>
                            <img
                              src={`http://localhost:3333/files/${ordersProducts.product.img}`}
                              alt={ordersProducts.product.name}
                            />
                            <strong>{ordersProducts.product.name}</strong>
                            <span>Quantidade: {ordersProducts.amount}</span>
                            <Button type="button">Concluir</Button>
                          </div>
                        </Product>
                      ));
                    })}
                </Section>
              </div>
            );
          })}
        </Orders>
      </Content>
    </Container>
  );
};
export default OrdersList;
