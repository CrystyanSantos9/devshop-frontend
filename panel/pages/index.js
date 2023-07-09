import { useFormik } from 'formik';

import Input from '../components/Input';
import Button from '../components/Button';
import { useMutation } from '../lib/graphql';
import { useRouter } from 'next/router';

const AUTH = `
  mutation auth($email: String!, $passwd: String!){
    auth(input: {
      email: $email,
      passwd: $passwd
    }){
      refreshToken
      accessToken
    }
  }
`;

const Index = () => {
  const router = useRouter();
  const [authData, auth] = useMutation(AUTH);

  const form = useFormik({
    initialValues: {
      email: '',
      passwd: '',
    },
    onSubmit: async values => {
      const data = await auth(values);
      if (data && data.data) {
        localStorage.setItem('refreshToken', data.data.auth.refreshToken);
        localStorage.setItem('accessToken', data.data.auth.accessToken);
        router.push('/dashboard');
      } else {
        console.log('error');
      }
    },
  });
  return (
    <div className='bg-grey-lighter min-h-screen flex flex-col'>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          <h1 className='mb-8 text-3xl text-center'>Sign in</h1>
          <form onSubmit={form.handleSubmit}>
            <Input
              label='E-mail'
              placeholder='Seu e-mail'
              name='email'
              value={form.values.email}
              onChange={form.handleChange}
              errorMessage={form}
              onBlur={form.handleBlur}
            />

            <Input
              label='Senha'
              placeholder='Sua senha'
              name='passwd'
              value={form.values.passwd}
              onChange={form.handleChange}
              errorMessage={form}
              onBlur={form.handleBlur}
            />

            <Button>Entrar</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;
