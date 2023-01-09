import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { OptionType, OptionItem } from './types';

export const optionsSlice = createApi({
  reducerPath: 'optionsSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3030',
    prepareHeaders(headers) {
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      fetchOptions: builder.query<OptionItem[], OptionType>({
        query(optionType) {
          return `/${optionType}`;
        },
      }),
    };
  },
});

export const { useFetchOptionsQuery } = optionsSlice;
