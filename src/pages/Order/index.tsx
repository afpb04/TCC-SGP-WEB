/* eslint-disable camelcase */
import React, { useEffect, useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';

import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import { Link, useRouteMatch } from 'react-router-dom';
import {
  Container,
  Content,
  Orders,
  NextOrders,
  Section,
  Product,
} from './styles';

import api from '../../services/api';

interface IProducts {
  id: string;
  name: string;
  description: string;
  img: string;
  price: number;
}

interface IOrdersProducts {
  id: string;
  totals: number;
  amount: number;
  product: IProducts;
  created_at: string;
}

interface ITable {
  name: string;
}

interface IOrders {
  id: string;
  totals: number;
  isfinished: boolean;
  dateFormatted: string;
  ordersProducts: [IOrdersProducts];
  table: ITable;
  updated_at: string;
}
interface OrderParams {
  id: string;
}

const Order: React.FC = () => {
  const { params } = useRouteMatch<OrderParams>();
  const [orders, setOrders] = useState<IOrders[]>([]);

  useEffect(() => {
    api.get<IOrders[]>(`orders/${params.id}`).then((response) => {
      const orderFormtted = response.data.map((order) => {
        return {
          ...order,
          dateFormatted: format(parseISO(order.updated_at), 'HH:mm'),
        };
      });
      setOrders(orderFormtted);
    });
  }, [params]);

  const orderFilter = useMemo(() => {
    return orders.filter((order) => order.isfinished === false);
  }, [orders]);

  return (
    <Container>
      <header>
        <div>
          <Link to="/CheckOut">
            <FiArrowLeft />
          </Link>
          <h1>SGP</h1>
        </div>
      </header>
      <Content>
        <Orders>
          {orderFilter.map((order) => {
            return (
              <div key={order.id}>
                <NextOrders>
                  <div>
                    <strong>{order.table.name} </strong>
                    <span>{order.isfinished ? 'Finalizado' : 'Em aberto'}</span>
                    <span> Total a receber: {order.totals},00</span>
                    <span>
                      Receber:
                      <Link to="/done">
                        <FiCheck />
                      </Link>
                    </span>
                  </div>
                </NextOrders>
                <Section>
                  <strong>Descrição do pedido</strong>
                  {order.ordersProducts.map((ordersProducts) => (
                    <Product key={ordersProducts.id}>
                      <div>
                        <img
                          src={`http://localhost:3333/files/${ordersProducts.product.img}`}
                          alt={ordersProducts.product.name}
                        />
                        <strong>{ordersProducts.product.name}</strong>
                        <span>Quantidade: {ordersProducts.amount}</span>
                        <span>Preço: {ordersProducts.product.price}</span>
                        <span>Total: {ordersProducts.totals}</span>
                      </div>
                    </Product>
                  ))}
                </Section>
              </div>
            );
          })}
        </Orders>
      </Content>
    </Container>
  );
};
export default Order;
