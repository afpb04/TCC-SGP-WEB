/* eslint-disable camelcase */
import React, { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { FiEdit } from 'react-icons/fi';
import { Container, Content, Products, Product } from './styles';

import api from '../../services/api';
import Header from '../../components/Header';

interface IProducts {
  id: string;
  name: string;
  description: string;
  img_url: string;
  category_id: string;
  price: number;
}
const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<IProducts[]>([]);

  useEffect(() => {
    api.get<IProducts[]>('/products').then((response) => {
      setProducts(response.data);
    });
  }, []);

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
          <h1>Lista de produtos</h1>
          <p>
            <span>Hoje</span>
            <span>{day}</span>
            <span>{weekDay}</span>
          </p>

          {products.map((product) => {
            return (
              <Product key={product.id}>
                <div>
                  <img src={product.img_url} alt={product.name} />
                  <strong>{product.name}</strong>
                  <span>{product.description}</span>
                  <span>
                    <FiEdit />
                  </span>
                </div>
              </Product>
            );
          })}
        </Products>
      </Content>
    </Container>
  );
};
export default ProductsList;
