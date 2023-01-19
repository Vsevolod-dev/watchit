import React, {FC, useContext, useEffect} from 'react';
import {Box, InputAdornment, Popover, Switch, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from '@mui/icons-material/FilterList';
import {useTranslation} from "react-i18next";
import TableContext from "../context/TableContext";
import PopupState, {bindPopover, bindTrigger} from "material-ui-popup-state";
import {RootState, useAppDispatch} from "../redux/store";
import {setSearch, setSearchColumns} from "../redux/slices/filtersSlice";
import {useSelector} from "react-redux";

const Search: FC = () => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    let columns = useContext(TableContext)
    columns = columns.filter(col => col.field !== 'expand')
    const {searchColumns} = useSelector((state: RootState) => state.filters)

    useEffect(() => {
        dispatch(setSearchColumns(columns.map(col => col.field)))
    }, [])

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
            <PopupState variant="popover">
                {(popupState) => (
                    <span>
                        <button style={{marginTop: '16px', cursor: "pointer", background: "inherit", border: "none"}} {...bindTrigger(popupState)}>
                            <FilterListIcon/>
                        </button>
                        <Popover
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            {searchColumns && <Box sx={{p: 2}}>
                                {columns.map(col => {

                                    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                                        if (checked) {
                                            dispatch(setSearchColumns([...searchColumns, col.field]))
                                        } else {
                                            dispatch(setSearchColumns(searchColumns.filter(sc => sc !== col.field)))
                                        }
                                    }

                                    return <div key={col.field}>
                                        <Switch checked={searchColumns.includes(col.field)}
                                                onChange={changeHandler}/>
                                        <span>{col.headerName}</span>
                                    </div>
                                })
                                }
                            </Box>}
                        </Popover>
                    </span>
                )}
            </PopupState>
        </div>
    );
};

export default Search;
