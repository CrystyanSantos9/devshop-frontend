import React from 'react';
import { MdShoppingCart, MdLeaderboard, MdShoppingBag } from 'react-icons/md';

import Button from '../../components/Button';
import Card from '../../components/Card';
import Layout from '../../components/Layout';
import Table from '../../components/Table';
import Title from '../../components/Title';
import { useMutation, useQuery } from '../../lib/graphql';
import Alert from '../../components/Alert';

const GET_ALL_USERS = `
            query {
                panelGetAllUsers{
                    id
                    name
                    email
                  }
            }
        `;

const DELETE_USER = `
 mutation deleteUser($id: String!){
  panelDeleteUser(id: $id)
 }
`;

const Index = () => {
  const { data, error, mutate } = useQuery(GET_ALL_USERS);
  const [deleteData, deleteUser] = useMutation(DELETE_USER);

  const remove = id => async () => {
    try {
      await deleteUser({ id });
      mutate({ ...data, name: 'removeData' });
    } catch (err) {
      console.log(err);
    }
  };

  if (error) return <div>Error {JSON.stringify(error)}</div>;
  // if (!data) return <div>{JSON.stringify(data.getAllUsers, null, 2)}</div>;

  return (
    <Layout>
      <Title>Gerenciar Usuários</Title>
      <div className='mt-8'></div>
      <div>
        <Button.Link href={'/users/create'}>Criar usuário</Button.Link>
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
            data?.panelGetAllUsers &&
            data.panelGetAllUsers.length === 0 && (
              <Alert>Nenhuma usuário criado até o momento!</Alert>
            )}

          {data && data?.panelGetAllUsers && data.panelGetAllUsers.length > 0 && (
            <div className='align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200'>
              <Table>
                <Table.Head>
                  <Table.TH className='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                    USUÁRIOS
                  </Table.TH>
                </Table.Head>

                <Table.Body>
                  {data?.panelGetAllUsers &&
                    data.panelGetAllUsers.map(item => {
                      return (
                        <Table.TR key={item.id}>
                          <Table.TD
                            itemId={item.id}
                            handleRemove={remove(item.id)}
                            title={item.name}
                            description={item.email}
                            href='/users'
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
