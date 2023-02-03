import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { OptionType, OptionItem } from './types';
import { InitialReduxState, UpdateOptionsCountPayload, OrderPhases } from './types';

const initialState: InitialReduxState = {
  orderPhase: 'inProgress',
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
    updateOrderPhase: (state, action: PayloadAction<OrderPhases>
    ) => { state.orderPhase = action.payload },
    resetOrder: () => initialState
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
        query: (optionType) => ({
          url: `/${optionType}`,
        })
      }),
      submitOrder: builder.mutation<{ orderNumber: number }, void>({
        query: () => ({
          url: '/order',
          method: 'POST'
        })
      })
    };
  },
});

export default optionsSlice.reducer;
export const { updateOptionsCount, updateOrderPhase, resetOrder } = optionsSlice.actions;
export const { useFetchOptionsQuery, useSubmitOrderMutation } = optionsApi;
