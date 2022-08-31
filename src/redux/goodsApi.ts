import { IGood } from './../interfaces/IGood.interface'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const goodsApi = createApi({
    reducerPath: 'goodsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:2999/' }),
    endpoints: (builder) => ({
        getGoods: builder.query<IGood[], { limit: string }>({
            query: ({ limit = '' }) => `goods?${limit ? `_limit=${limit}` : ''}`,
        }),
        addGood: builder.mutation<IGood[], { name: string }>({
            query: (name) => ({
                url: 'goods',
                method: 'POST',
                body: name,
            }),
        }),
    }),
})

export const { useGetGoodsQuery, useAddGoodMutation } = goodsApi
