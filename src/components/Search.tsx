import {FC, useContext, useEffect} from 'react';
import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useTranslation} from "react-i18next";
import TableContext from "../context/TableContext";
import {useAppSelector} from "../redux/store";
import {filtersAction} from "../redux/slices/filtersSlice";
import FilterPopup from "./FilterPopup";
import { useActionCreators } from '../hooks/useActionCreators';

const Search: FC = () => {
    const {t} = useTranslation()
    let columns = useContext(TableContext)
    columns = columns.filter(col => col.field !== 'expand')
    const searchColumns = useAppSelector(state => state.filters.searchColumns)
    const actions = useActionCreators(filtersAction)

    useEffect(() => {
        filtersAction.setSearchColumns(columns.map(col => col.field))
    }, [])

    if (!searchColumns) return <></>

    return (
        <div style={{marginLeft: 'auto'}}>
            <TextField
                label={t('Search')}
                variant="standard"
                onChange={(e) => filtersAction.setSearch(e.target.value)}
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
                actualColumns={searchColumns}
                allCols={columns}
                setFn={filtersAction.setSearchColumns}
            />
        </div>
    );
};

export default Search;
