import { useState } from 'react';

import useSWR from 'swr';

const fetcher = async query => {
  const URL_API = process.env.NEXT_PUBLIC_API;
  const res = await fetch(URL_API, {
    headers: {
      'Content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(query),
  });
  const json = await res.json();
  return json.data;
};

const useQuery = queryString => {
  const query = {
    query: queryString,
  };
  return useSWR(query, fetcher);
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
    } catch (err) {
      console.log(err);
    }
  };
  return [data, mutate];
};

export { useQuery, useMutation };
