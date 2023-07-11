import { useState } from 'react';

import useSWR from 'swr';

const getNewAccessToken = async URL_API => {
  const headers = {
    'Content-type': 'application/json',
  };

  const getAccessToken = {
    query: `
      mutation getAccessToken($refreshToken: String!){
        accessToken(refreshToken: $refreshToken)
      }
    `,
    variables: {
      refreshToken: localStorage.getItem('refreshToken'),
    },
  };
  console.log('mutation na function ---> ', getAccessToken);

  const resAccessToken = await fetch(URL_API, {
    headers,
    method: 'POST',
    body: JSON.stringify(getAccessToken),
  });

  console.log(resAccessToken);

  const jsonAccessToken = await resAccessToken.json();
  console.log('na funcao jsonAcccessToken', jsonAccessToken);
  return jsonAccessToken;
};

const fetcher = async query => {
  const accessToken = localStorage.getItem('accessToken');

  const URL_API = process.env.NEXT_PUBLIC_API;

  const headers = {
    'Content-type': 'application/json',
  };

  if (accessToken) {
    headers['authorization'] = 'Bearer ' + accessToken;
  }

  const res = await fetch(URL_API, {
    headers,
    method: 'POST',
    body: JSON.stringify(query),
  });

  const json = await res.json();

  if (
    !(
      json.errors &&
      json.errors[0] &&
      json.errors[0].message === 'Forbidden resource'
    )
  ) {
    return json;
  }

  //se erro, gerar novo accessToken
  const jsonAccessToken = await getNewAccessToken(URL_API);

  console.log('Novo jsson----->>>', jsonAccessToken);
  if (jsonAccessToken.data) {
    const newAccessToken = jsonAccessToken.data.accessToken;
    localStorage.setItem('accessToken', newAccessToken);

    const res2 = await fetcher(URL_API, {
      headers: {
        'Content-type': 'application/json',
        authorization: 'Bearer ' + newAccessToken,
      },
      method: 'POST',
      body: JSON.stringify(query),
    });

    const json2 = await res2.json();
    if (!json.errors) {
      return json2;
    }
  }
  // se chegou aqui
  window.location = '/';
  return null;
};

const uploader = async formData => {
  const URL_API = process.env.NEXT_PUBLIC_API;

  const accessToken = localStorage.getItem('accessToken');
  const headers = {};
  if (accessToken) {
    headers['authorization'] = 'Bearer ' + accessToken;
  }
  const res = await fetch(URL_API, {
    headers,
    method: 'POST',
    body: formData,
  });
  const json = await res.json();
  if (!json.errors) {
    return json;
  }

  //caso haja erro ( sem access token, ou com expiração )
  const jsonAccessToken = await getNewAccessToken();
  if (jsonAccessToken.data) {
    const newAccessToken = jsonAccessToken.data.accessToken;
    localStorage.setItem('accessToken', newAccessToken);

    const res2 = await fetcher(URL_API, {
      headers: {
        authorization: 'Bearer ' + newAccessToken,
      },
      method: 'POST',
      body: formData,
    });

    const json2 = await res2.json();
    if (!json.errors) {
      return json2;
    }
  }

  // nao tem accesstoken, nem refreshtoken  ( inválidos ou auxentes )
  window.location = '/';
  return null;
};

const useQuery = queryString => {
  const query = {
    query: queryString,
  };
  const allData = useSWR(query, fetcher);
  const { data, ...rest } = allData;
  return { data: data ? data.data : null, ...rest };
};

const useMutation = query => {
  const [data, setData] = useState(null);
  const mutate = async variables => {
    const mutation = {
      query,
      variables,
    };
    try {
      const returnedData = await fetcher(mutation);
      setData(returnedData);
      return returnedData;
    } catch (err) {
      console.log(err);
    }
  };
  return [data, mutate];
};

const useUpload = query => {
  const [data, setData] = useState(null);
  const mutate = async variables => {
    const mutation = {
      query,
      variables: {
        ...variables,
        file: null,
      },
    };

    const map = {
      0: ['variables.file'],
    };

    const formData = new FormData();
    formData.append('operations', JSON.stringify(mutation));
    formData.append('map', JSON.stringify(map));
    formData.append(0, variables.file);

    try {
      const returnedData = await uploader(formData);
      setData(returnedData);
      return returnedData;
    } catch (err) {
      console.log(err);
    }
  };
  return [data, mutate];
};

export { useQuery, useMutation, fetcher, useUpload };
