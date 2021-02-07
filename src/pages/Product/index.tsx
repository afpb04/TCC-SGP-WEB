/* eslint-disable camelcase */
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  FiUser,
  FiCamera,
  FiArrowLeft,
  FiDollarSign,
  FiFileText,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AvatarInput } from './styles';

interface ProductParams {
  id: string;
}
interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  img_url: string;
  category_id: string;
}

const Product: React.FC = () => {
  const { params } = useRouteMatch<ProductParams>();
  const [product, setProduct] = useState<IProduct | null>(null);

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => {
    api.get<IProduct>(`products/${params.id}`).then((response) => {
      setProduct(response.data);
    });
  }, [params.id]);

  const handleSubmit = useCallback(
    async (data: IProduct) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          description: Yup.string().required('A Discrição é obrigatória!'),
          price: Yup.string().required('O preço do produto é obrigratório!'),
          category_id: Yup.string().required(
            'O id da categoria é obrigratorio!',
          ),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put(`product/${params.id}`, data);

        history.push('/products');

        addToast({
          type: 'success',
          title: 'Produto atualizado!',
          description:
            'Suas informações do produto foram atualizadas com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description:
            'Ocorreu um erro ao fazer a atualização do produto, tente novamente.',
        });
      }
    },
    [addToast, history, params.id],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('img', e.target.files[0]);

        api.patch(`/products/img/${params.id}`, data).then(() => {
          addToast({
            type: 'success',
            title: 'Imagem atualizada!',
          });
        });
      }
    },
    [addToast, params.id],
  );
  return (
    <Container>
      <header>
        <div>
          <Link to="/products">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      {product && (
        <Content>
          <Form
            ref={formRef}
            initialData={{
              name: product.name,
              description: product.description,
              price: product.price,
              category_id: product.category_id,
            }}
            onSubmit={handleSubmit}
          >
            <AvatarInput>
              <img src={product.img_url} alt={product.name} />
              <label htmlFor="img">
                <FiCamera />
                <input
                  type="file"
                  name="img"
                  id="img"
                  onChange={handleAvatarChange}
                />
              </label>
            </AvatarInput>

            <h1>Produto</h1>
            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input
              name="description"
              icon={FiFileText}
              placeholder="Descrição"
            />

            <Input
              containerStyle={{ marginTop: 24 }}
              name="price"
              icon={FiDollarSign}
              placeholder="Preço"
            />
            <Input
              name="category_id"
              icon={FiFileText}
              placeholder="Categoria"
            />

            <Button type="submit">Confirmar mudanças</Button>
          </Form>
        </Content>
      )}
    </Container>
  );
};

export default Product;
