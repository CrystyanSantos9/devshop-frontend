import React, { useEffect } from 'react';
import { MdShoppingCart, MdLeaderboard, MdShoppingBag } from 'react-icons/md';

import Link from 'next/link';

import Card from '../../components/Card';
import Layout from '../../components/Layout';
import Table from '../../components/Table';
import Title from '../../components/Title';
import { useMutation, useQuery } from '../../lib/graphql';

const GET_ALL_CATEGORIES = `
            query {
                getAllCategories{
                    id
                    name
                    slug
                  }
            }
        `;

const DELETE_CATEGORY = `
 mutation deleteCategory($id: String!){
   deleteCategory(id: $id)
 }
`;

const Index = () => {
  const { data, error, mutate } = useQuery(GET_ALL_CATEGORIES);
  const [deleteData, deleteCategory] = useMutation(DELETE_CATEGORY);

  const remove = id => async () => {
    try {
      await deleteCategory({ id });
      mutate({ ...data, name: 'removeData' });
    } catch (err) {
      console.log(err);
    }
  };

  if (error) return <div>Error {JSON.stringify(error)}</div>;
  // if (!data) return <div>{JSON.stringify(data.getAllCategories, null, 2)}</div>;

  return (
    <Layout>
      <Title>Gerenciar Categorias</Title>
      <div className='mt-8'></div>
      <div>
        <Link href='/categories/create'>
          <a>Criar categoria</a>
        </Link>
      </div>
      <div className='mt-4'>
        <div className='flex flex-wrap -mx-6'>
          <Card>
            <Card.Icon>
              <MdShoppingCart className='h-8 w-8 text-white' />
            </Card.Icon>
            <Card.Data>
              <Card.Title> 8,282</Card.Title>
              <Card.Description>Products</Card.Description>
            </Card.Data>
          </Card>

          <Card>
            <Card.Icon colorIcon='bg-blue-600'>
              <MdLeaderboard className='h-8 w-8 text-white' />
            </Card.Icon>
            <Card.Data>
              <Card.Title>2000</Card.Title>
              <Card.Description>Products</Card.Description>
            </Card.Data>
          </Card>

          <Card className='w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0'>
            <Card.Icon colorIcon='bg-orange-600'>
              <MdShoppingBag className='h-8 w-8 text-white' />
            </Card.Icon>
            <Card.Data>
              <Card.Title>215,542</Card.Title>
              <Card.Description>Available Products</Card.Description>
            </Card.Data>
          </Card>
        </div>
      </div>

      <div className='mt-8'></div>

      <div className='flex flex-col mt-8'>
        <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
          {data &&
            data?.getAllCategories &&
            data.getAllCategories.length === 0 && (
              <div
                className='flex bg-yellow-100 rounded-lg p-4 mb-4 text-sm text-yellow-700'
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
                  <span className='font-medium'> Atenção!</span> Nenhuma
                  categoria criada até o momento.
                </div>
              </div>
            )}

          {data && data?.getAllCategories && data.getAllCategories.length > 0 && (
            <div className='align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200'>
              <Table>
                <Table.Head>
                  <Table.TH className='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                    CATEGORIAS
                  </Table.TH>
                </Table.Head>

                <Table.Body>
                  {data?.getAllCategories &&
                    data.getAllCategories.map(item => {
                      return (
                        <Table.TR key={item.id}>
                          <Table.TD
                            handleRemove={remove(item.id)}
                            title={item.name}
                            description={item.slug}
                          ></Table.TD>
                        </Table.TR>
                      );
                    })}
                </Table.Body>
              </Table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
