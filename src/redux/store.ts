import { configureStore } from '@reduxjs/toolkit'
import {useDispatch, useSelector} from 'react-redux';
import filtersSlice from './slices/filtersSlice';
import {usersApi} from '../services/UsersService';
import { TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        filters: filtersSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        usersApi.middleware,
    )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
