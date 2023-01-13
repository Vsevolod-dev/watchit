import {createSlice} from '@reduxjs/toolkit';
import {FiltersType} from "../../types";


const initialState: FiltersType = {
    page: '1',
    limit: '5',
    dateFrom: new Date().toLocaleDateString(),
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
        setDateFrom(state, action) {
            state.dateFrom = action.payload
        },
        setDateTo(state, action) {
            state.dateTo = action.payload
        }
    },
})

export const {setPage, setLimit, setSearch, setDateFrom, setDateTo} = filtersSlice.actions

export default filtersSlice.reducer