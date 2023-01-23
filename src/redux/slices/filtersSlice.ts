import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FiltersType, SortType} from "../../types";

let d = new Date();
d.setDate(d.getDate() - 7);

const initialState: FiltersType = {
    page: 1,
    limit: 5,
    dateFrom: d.toLocaleDateString(),
    dateTo: new Date().toLocaleDateString()
}

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setPage(state, action) {
            state.page = action.payload
        },
        setLimit(state, action) {
            state.limit = action.payload
        },
        setSearch(state, action) {
            state.search = action.payload
        },
        setSearchColumns(state, action) {
            state.searchColumns = action.payload
        },
        setDateFrom(state, action) {
            state.dateFrom = action.payload
        },
        setDateTo(state, action) {
            state.dateTo = action.payload
        },
        setSort(state, action: PayloadAction<SortType>) {
            state.sort = action.payload
        },
    },
})

export const {reducer: filtersReducer, actions: filtersAction} = filtersSlice