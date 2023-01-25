import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { OptionType, OptionItem } from './types';
import { UpdateOptionsCountPayload } from './types';

interface InitialState {
  scoops: { [index: string]: number },
  toppings: { [index: string]: number },
}

const initialState: InitialState = {
  scoops: {},
  toppings: {},
};



const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    updateOptionsCount: (
      state,
      action: PayloadAction<UpdateOptionsCountPayload>
    ) => {
      state[action.payload.optionType][action.payload.itemName] = action.payload.newItemCount

    },
  },
});

export const optionsApi = createApi({
  reducerPath: 'optionsApi',
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

export default optionsSlice.reducer;
export const { updateOptionsCount } = optionsSlice.actions;
export const { useFetchOptionsQuery } = optionsApi;
