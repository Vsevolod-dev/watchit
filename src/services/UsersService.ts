import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {FiltersType, UserType} from "../types";

export type FetchUsersResponse = {
    apiResponse: UserType[],
    totalCount?: number
}

type FetchUsersParams = {
    created_gte: string,
    created_lte: string
    _page: number
    _limit: number
    _sort?: string
    _order?: string
}

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:3002`,
    }),
    endpoints: (build) => ({
        fetchUsers: build.query<FetchUsersResponse, FiltersType>({
            query: ({dateFrom, dateTo, page, limit, sort, search, searchColumns}) => {
                const params: any = {
                    created_gte: dateFrom,
                    created_lte: dateTo,
                    _page: page,
                    _limit: limit
                }

                if (sort) { // Dump backend
                    params['_sort'] = sort.column
                    params['_order'] = sort.order
                }

                if (search && search !== '' && searchColumns && searchColumns.length > 0) {
                    searchColumns.forEach(col => {
                        params[col] = search
                    })
                }

                return {
                    url: `/users`,
                    params
                }
            },
            transformResponse(apiResponse, meta) {
                const res: FetchUsersResponse = {
                    apiResponse: apiResponse as UserType[]
                }

                if (meta && meta.response) {
                    res.totalCount = Number(meta.response.headers.get('X-Total-Count'))
                }

                return res
            }
        }),
    })
});

export const {useLazyFetchUsersQuery} = usersApi
