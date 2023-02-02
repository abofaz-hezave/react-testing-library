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

    };
  },
});

export default optionsSlice.reducer;
export const { updateOptionsCount, updateOrderPhase } = optionsSlice.actions;
export const { useFetchOptionsQuery } = optionsApi;
