import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {FiltersType, UserType} from "../types";

type FetchUsersResponse = {
    apiResponse: UserType[],
    totalCount?: number
}

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:3001`,
        mode: 'cors',
    }),
    endpoints: (build) => ({
        fetchUsers: build.query<FetchUsersResponse, FiltersType>({
            query: ({dateFrom, dateTo, page, limit}) => ({
                url: `/users`,
                params: {
                    dateFrom,
                    dateTo,
                    _page: page,
                    _limit: limit
                }
            }),
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
