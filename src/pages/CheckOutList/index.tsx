/* eslint-disable camelcase */
import React, { useEffect, useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Container, Content, Products, Product } from './styles';

import api from '../../services/api';
import Header from '../../components/Header';

interface IOrders {
  id: string;
  totals: number;
  isfinished: boolean;
}
interface ITables {
  id: string;
  name: string;
  available: boolean;
  updated_at: string;
  dateFormatted: string;
  orders: [IOrders];
}

const CheckOutList: React.FC = () => {
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

  const tableNotAvaliable = useMemo(() => {
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
        <Products>
          <h1>CheckOut</h1>
          <p>
            <span>Hoje</span>
            <span>{day}</span>
            <span>{weekDay}</span>
          </p>
          {tableNotAvaliable &&
            tableNotAvaliable.map((table) =>
              table.orders
                .filter((order) => order.isfinished === false)
                .map((orders) => (
                  <Product key={orders.id}>
                    <div>
                      <strong>{table.name}</strong>
                      <span>
                        {orders.isfinished ? 'Finalizado' : 'Em aberto'}
                      </span>
                      <span>Total a pagar: {orders.totals},00</span>
                      <span>
                        <Link to={`/order/${table.id}`}>
                          <FiArrowRight />
                        </Link>
                      </span>
                    </div>
                  </Product>
                )),
            )}
        </Products>
      </Content>
    </Container>
  );
};
export default CheckOutList;
