import { configureStore } from '@reduxjs/toolkit'
import { goodsApi } from './goodsApi'

export const rootStore = configureStore({
    reducer: {
        // api
        [goodsApi.reducerPath]: goodsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(goodsApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type IRootStore = ReturnType<typeof rootStore.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type IAppDispatch = typeof rootStore.dispatch
