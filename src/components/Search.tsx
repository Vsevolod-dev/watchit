import React, {FC, useContext, useEffect} from 'react';
import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useTranslation} from "react-i18next";
import TableContext from "../context/TableContext";
import {RootState, useAppDispatch} from "../redux/store";
import {setSearch, setSearchColumns} from "../redux/slices/filtersSlice";
import {useSelector} from "react-redux";
import FilterPopup from "./FilterPopup";

const Search: FC = () => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    let columns = useContext(TableContext)
    columns = columns.filter(col => col.field !== 'expand')
    const {searchColumns} = useSelector((state: RootState) => state.filters)

    useEffect(() => {
        dispatch(setSearchColumns(columns.map(col => col.field)))
    }, [])

    if (!searchColumns) return <></>

    return (
        <div>
            <TextField
                label={t('Search')}
                variant="standard"
                onChange={(e) => dispatch(setSearch(e.target.value))}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon/>
                        </InputAdornment>
                    ),
                }}
            />
            <FilterPopup
                style={{marginTop: '16px', cursor: "pointer", background: "inherit", border: "none"}}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                searchColumns={searchColumns}
                columns={columns}
                setFunct={setSearchColumns}
            />
        </div>
    );
};

export default Search;
