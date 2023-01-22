import {createSlice} from '@reduxjs/toolkit';
import {UIType} from "../../types";

const initialState: UIType = {
    dateFormat: 'DD-MM-YYYY HH:mm:ss'
}

export const uiSlice = createSlice({
name: 'ui',
    initialState,
    reducers: {
        setShownColumns(state, action) {
            state.shownColumns = action.payload
        },
        setDateFormat(state, action) {
            state.dateFormat = action.payload
        }
    },
})

export const {setShownColumns, setDateFormat} = uiSlice.actions

export default uiSlice.reducer