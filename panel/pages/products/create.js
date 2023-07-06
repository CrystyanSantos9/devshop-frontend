import React, { useEffect } from 'react';

import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';
import Layout from '../../components/Layout';
import Select from '../../components/Select';
import Title from '../../components/Title';
import { useMutation, useQuery, fetcher } from '../../lib/graphql';

const GET_ALL_CATEGORIES = `
            query {
                getAllCategories{
                    id
                    name
                    slug
                  }
            }
        `;

const CREATE_PRODUCT = `
            mutation createProduct($name: String!, $slug: String! $description: String!, $category: String! ) {
              createProduct(input: {
                    name: $name,
                    slug: $slug,
                    description: $description,
                    category: $category
                }) {
                    id
                    name
                    slug
                  }
            }
        `;

const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, 'Por favor, informe pelo menos um nome com 5 caracteres.')
    .required('Por favor, informe um nome.'),
  slug: Yup.string()
    .min(5, 'Por favor, informe um slug com pelo menos 5 caracteres.')
    .required('Por favor, informe um slug.')
    .test(
      'is-unique',
      'Por favor, utilize outro slug. Este já está em uso.',
      async value => {
        const isSlug = await fetcher({
          query: `
                  query{
                    getProductBySlug(slug:"${value}"){
                      id
                    }
                  }
                `,
        });
        if (isSlug.errors) {
          return true;
        }
        return false;
      },
    ),
    description: Yup.string()
    .min(10, 'Por favor, informe pelo menos uma descrição com 10 caracteres.')
    .required('Por favor, informe uma descrição.'),
    category: Yup.string()
    .min(1, 'Por favor, selecione uma categoria.')
    .required('Por favor, selecione uma categoria.'),

});

const Index = () => {
  //   const { data, error } = useQuery(query);
  const router = useRouter();
  const { data: categories, error, mutate } = useQuery(GET_ALL_CATEGORIES);
  const [data, createProduct] = useMutation(CREATE_PRODUCT);

  const form = useFormik({
    initialValues: {
      name: '',
      slug: '',
      description: '',
      category: '',
      // category: categories && categories.getAllCategories[0].id,
    },
    validationSchema: ProductSchema,
    onSubmit: async values => {
      const data = await createProduct(values);
      if (data && !data.errors) {
        router.push('/products');
      }
    },
  });

  //tratando options do select
  let options = [];
  if (categories && categories.getAllCategories) {
    options = categories.getAllCategories.map(item => {
      return {
        id: item.id,
        label: item.name,
      };
    });
  }

  //   if (error) return <div>Error {JSON.stringify(error)}</div>;
  //   if (data) return <div>{JSON.stringify(data.getAllCategories, null, 2)}</div>;

  return (
    <Layout>
      <Title>Criar novo Produto</Title>
      <div className='flex flex-col mt-8'></div>
      <Button.LinkOutline href={'/products'}>Voltar</Button.LinkOutline>

      <div className='flex flex-col mt-8'>
        <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
          <form
            onSubmit={form.handleSubmit}
            className='px-8 pt-6 pb-8 mb-4 bg-white rounded'
          >
            {data && !!data.errors && (
              <div
                className='flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700'
                role='alert'
              >
                <svg
                  className='w-5 h-5 inline mr-3'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <div>
                  <span className='font-medium'>Alerta de erro!</span> Ocorreu
                  um erro ao salvar os dados.
                </div>
              </div>
            )}
            <div className='w-full mb-4 md:flex md:justify-between'></div>
            <Input
              label='Produto'
              placeholder='Preecha com o nome do produto'
              name='name'
              value={form.values.name}
              onChange={form.handleChange}
              errorMessage={form}
            />
            <Input
              label='Slug'
              placeholder='Preencha o slug do produto'
              name='slug'
              value={form.values.slug}
              onChange={form.handleChange}
              errorMessage={form}
              helpText='Slug é utilizado para URLs amigáveis.'
            />
            <Input
              label='Description'
              placeholder='Preencha com a descrição do produto'
              name='description'
              value={form.values.description}
              onChange={form.handleChange}
              errorMessage={form}
              helpText=''
            />
            {/* {categories &&
              JSON.stringify(categories.getAllCategories[0].id, null, 2)} */}
            <Select
              label='Categoria'
              placeholder='Preencha com a descrição do produto'
              name='category'
              value={form.values.category}
              onChange={form.handleChange}
              errorMessage={form}
              options={options}
              initial={{id: '', label: 'Selecione...'}}
            />
            <Button> Salvar produto </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
