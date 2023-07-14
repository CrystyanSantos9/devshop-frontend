import React, { useEffect, useState } from 'react';

import { useFormik, validateYupSchema } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';
import Layout from '../../components/Layout';
import Title from '../../components/Title';
import { fetcher, useMutation, useQuery } from '../../lib/graphql';

const CREATE_USER = `
            mutation createUser($name: String!, $email: String!, $passwd: String!, $role: String! ) {
              panelCreateUser(input: {
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
    .required('Por favor, informe um email válido.')
    .test(
      'is-unique',
      'Por favor, utilize outro email. Este já está em uso.',
      async value => {
        const isEmail = await fetcher({
          query: `
                query{
                  panelGetUserByEmail(email:"${value}"){
                    id
                  }
                }
              `,
        });
        if (isEmail.errors) {
          console.log(JSON.stringify(isEmail));
          return true;
        }
        return false;
      },
    ),
  passwd: Yup.string()
    .min(5, 'Por favor, informe pelo menos uma senha com 5 caracteres.')
    .required('Por favor, informe uma senha válida.'),
});

const Index = () => {
  //   const { data, error } = useQuery(query);
  const router = useRouter();
  const [data, createUser] = useMutation(CREATE_USER);

  const form = useFormik({
    initialValues: {
      name: '',
      email: '',
      passwd: '',
      role: '',
    },
    validationSchema: UserSchema,
    onSubmit: async values => {
      const data = await createUser(values);
      if (data && !data.errors) {
        router.push('/users');
      }
    },
  });

  // if (error) return <div>Error {JSON.stringify(error)}</div>;
  //   if (data) return <div>{JSON.stringify(data.getAllCategories, null, 2)}</div>;

  return (
    <Layout>
      <Title>Criar novo usuário</Title>
      <div className='flex flex-col mt-8'></div>

      <Button.LinkOutline href={'/users'}>Voltar</Button.LinkOutline>
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
              label='Users'
              placeholder='Preecha com a nome do usuário'
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
    </Layout>
  );
};

export default Index;
