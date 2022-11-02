import React from 'react';
import { MdShoppingCart, MdLeaderboard, MdShoppingBag } from 'react-icons/md';

import Card from '../components/Card';
import Layout from '../components/Layout';
import Table from '../components/Table';
import Title from '../components/Title';

const Index = () => {
  return (
    <Layout>
      <Title>DevShop Painel de Controle</Title>

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
          <div className='align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200'>
            <Table>
              <Table.Head>
                <Table.TH className='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                  Name
                </Table.TH>
                <Table.TH className='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                  Title
                </Table.TH>
                <Table.TH className='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                  Status
                </Table.TH>
                <Table.TH className='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                  Role
                </Table.TH>
              </Table.Head>

              <Table.Body>
                <Table.TR>
                  <Table.TD
                    name='Jhon Dee'
                    email='jhonD33@gmail.com'
                    title='Software Engineer'
                    description='Web Dev'
                    status='Active'
                    role='Owner'
                  ></Table.TD>
                </Table.TR>
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
