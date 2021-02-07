/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';

import { useRouteMatch } from 'react-router-dom';

import {
  Container,
  Content,
  MenuContent,
  Category,
  Section,
  Product,
} from './styles';

import api from '../../services/api';

interface IProducts {
  id: string;
  name: string;
  description: string;
  img_url: string;
  category_id: string;
  price: number;
}
interface Category {
  id: string;
  name: string;
  description: string;
}
interface Company {
  name: string;
}
interface CompanyParams {
  id: string;
}
const Menu: React.FC = () => {
  const { params } = useRouteMatch<CompanyParams>();
  const [products, setProducts] = useState<IProducts[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    api.get<Company>(`companies/${params.id}`).then((response) => {
      setCompany(response.data);
    });
    api.get<Category[]>(`categories/${params.id}`).then((response) => {
      setCategories(response.data);
    });
    api.get<IProducts[]>(`products/${params.id}`).then((response) => {
      setProducts(response.data);
    });
  }, [params.id]);

  return (
    <Container>
      <header>
        <div>
          <h1>{company?.name} - Cadápio</h1>
        </div>
      </header>
      <Content>
        <MenuContent>
          {categories &&
            categories.map((category) => (
              <div key={category.id}>
                <Category>
                  <div>
                    <strong>{category.name}</strong>
                    <span>{category.description}</span>
                  </div>
                </Category>
                <Section>
                  {products &&
                    products
                      .filter((product) => product.category_id === category.id)
                      .map((product) => (
                        <Product key={product.id}>
                          <div>
                            <img src={product.img_url} alt={product.name} />
                            <strong>{product.name}</strong>
                            <span>{product.description}</span>
                            <span>Preço: {product.price} </span>
                          </div>
                        </Product>
                      ))}
                </Section>
              </div>
            ))}
        </MenuContent>
      </Content>
    </Container>
  );
};
export default Menu;
