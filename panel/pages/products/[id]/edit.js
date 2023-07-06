import React, { useEffect } from 'react';

import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Layout from '../../../components/Layout';
import Select from '../../../components/Select';
import Title from '../../../components/Title';
import { useMutation, useQuery, fetcher } from '../../../lib/graphql';

let id = '';

const GET_ALL_CATEGORIES = `
            query {
                getAllCategories{
                    id
                    name
                    slug
                  }
            }
        `;

const UPDATE_PRODUCT = `
            mutation updateProduct($id: String!, $name: String!, $slug: String!, $description: String!, $category: String!) {
                updateProduct(input: {
                    id: $id,
                    name: $name,
                    description: $description,
                    slug: $slug,
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
        if (isSlug.data.getProductBySlug.id === id) {
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

export default function Edit() {
  const router = useRouter();
  id = router.query.id;
  // BUSCANDO DADOS DO SERVIDOR
  const { data, getProductById } = useQuery(`
  query {
    getProductById(id: "${router.query.id}"){
        name
        slug
        description
        category
    }
}
  `);

  const { data: categories, getAllCategories } = useQuery(GET_ALL_CATEGORIES);
  const [dataUpdated, updateProduct] = useMutation(UPDATE_PRODUCT);

  const form = useFormik({
    initialValues: {
      name: '',
      slug: '',
      description: '',
      category: '',
    },
    validationSchema: ProductSchema,
    onSubmit: async values => {
      const category = {
        ...values,
        id: router.query.id,
      };
      const data = await updateProduct(category);
      if (data && !data.errors) {
        router.push('/products');
      }
    },
  });

  useEffect(() => {
    if (data && data.getProductById) {
      console.log(data.getProductById);
      form.setFieldValue('name', data.getProductById.name);
      form.setFieldValue('slug', data.getProductById.slug);
      form.setFieldValue('description', data.getProductById.description);
      form.setFieldValue('category', data.getProductById.category);
    }
  }, [data]);

  let options = [];
  if (categories && categories.getAllCategories) {
    options = categories.getAllCategories.map(item => {
      return {
        id: item.id,
        label: item.name,
      };
    });
  }

  return (
    <Layout>
      <Title>Editar produto</Title>
      {/* {data && JSON.stringify(data, null, 2)} */}
      <div className='flex flex-col mt-8'>
        <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
          <div className='align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200'>
            {/* {data && JSON.stringify(data.getCategoryById)} */}
            <form
              onSubmit={form.handleSubmit}
              className='px-8 pt-6 pb-8 mb-4 bg-white rounded'
            >
              {dataUpdated && !!dataUpdated.errors && (
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
              <Input
                label='Nome do Produto'
                placeholder='Preecha com a nome do Produto'
                name='name'
                value={form.values.name}
                errorMessage={form}
                onChange={form.handleChange}
              />
              <Input
                label='Slug do produto'
                placeholder='Preencha o slug do produto'
                name='slug'
                value={form.values.slug}
                onChange={form.handleChange}
                errorMessage={form}
                helpText='Slug é utilizado para URLs amigáveis.'
              />
              {/* {data &&
                data.getProductById &&
                JSON.stringify(form.values, null, 2)} */}
              <Input
                label='Descrição'
                placeholder='Preencha com a descrição do produto'
                name='description'
                value={form.values.description}
                errorMessage={form}
                onChange={form.handleChange}
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
                initial={{ id: '', label: 'Selecione...' }}
              />
              <Button> Atualizar produto </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
