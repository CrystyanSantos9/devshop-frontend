import React, { useEffect } from 'react';

import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Layout from '../../../components/Layout';
import Title from '../../../components/Title';
import { useQuery, useMutation, fetcher } from '../../../lib/graphql';

let id = '';

const UPDATE_USER = `
            mutation updateUser( $id: String!,$name: String!, $email: String!, $passwd: String!, $role: String! )  {
              panelUpdateUser(input: {
                  id: $id,
                  name: $name,
                  email: $email,
                  passwd: $passwd,
                  role: $role
                }) {
                    id
                    name
                    email
                  }
            }
        `;

const UserSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, 'Por favor, informe pelo menos um nome com 5 caracteres.')
    .required('Por favor, informe um nome.'),
  email: Yup.string()
    .email()
    .min(5, 'Por favor, informe pelo menos um email com 5 caracteres.')
    .required('Por favor, informe um email válido.'),
  passwd: Yup.string()
    .min(5, 'Por favor, informe pelo menos uma senha com 5 caracteres.')
    .required('Por favor, informe uma senha válida.'),
  //   slug: Yup.string()
  //     .min(5, 'Por favor, informe um slug com pelo menos 5 caracteres.')
  //     .required('Por favor, informe um slug.')
  //     .test(
  //       'is-unique',
  //       'Por favor, utilize outro slug. Este já está em uso.',
  //       async value => {
  //         const isSlug = await fetcher({
  //           query: `
  //           query{
  //             getUserBySlug(slug:"${value}"){
  //               id
  //             }
  //           }
  //         `,
  //         });
  //         if (isSlug.errors) {
  //           return true;
  //         }
  //         return false;
  //       },
  //     ),
});

export default function Edit() {
  const router = useRouter();
  id = router.query.id;
  // BUSCANDO DADOS DO SERVIDOR
  const { data, error, mutate } = useQuery(`
  query {
    panelGetUserById(id: "${router.query.id}"){
        name
        email
        role
    }
}
  `);

  const [dataUpdated, updateUser] = useMutation(UPDATE_USER);

  const form = useFormik({
    initialValues: {
      name: '',
      email: '',
      passwd: '',
      role: '',
    },
    validationSchema: UserSchema,
    onSubmit: async values => {
      const user = {
        ...values,
        id: router.query.id,
      };
      const data = await updateUser(user);
      if (data && !data.errors) {
        router.push('/users');
      }
    },
  });

  useEffect(() => {
    if (data && data.panelGetUserById) {
      form.setFieldValue('name', data.panelGetUserById.name);
      form.setFieldValue('email', data.panelGetUserById.email);
      form.setFieldValue('role', data.panelGetUserById.role);
    }
  }, [data]);

  return (
    <Layout>
      <Title>Editar Usuário</Title>
      {/* {data && JSON.stringify(data, null, 2)} */}
      <div className='flex flex-col mt-8'>
        <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
          <div className='align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200'>
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
            <form
              onSubmit={form.handleSubmit}
              className='px-8 pt-6 pb-8 mb-4 bg-white rounded'
            >
              <Input
                label='Users'
                placeholder='Preencha com a nome do usuário'
                name='name'
                value={form.values.name}
                onChange={form.handleChange}
                errorMessage={form}
                onBlur={form.handleBlur}
              />
              <Input
                label='Email'
                placeholder='Preencha com o email do usuário'
                name='email'
                value={form.values.email}
                onChange={form.handleChange}
                errorMessage={form}
              />

              <Input
                label='Senha'
                placeholder='Preencha uma senha segura'
                name='passwd'
                value={form.values.passwd}
                onChange={form.handleChange}
                errorMessage={form}
              />

              <Input
                label='Role'
                placeholder='Preencha com uma role válida.'
                name='role'
                value={form.values.role}
                onChange={form.handleChange}
                errorMessage={form}
              />
              <Button> Salvar usuário </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
