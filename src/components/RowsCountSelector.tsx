import React, {FC} from 'react';
import {MenuItem, SelectChangeEvent} from "@mui/material";
import {setLimit, setPage} from "../redux/slices/filtersSlice";
import {RootState, useAppDispatch} from "../redux/store";
import {useSelector} from "react-redux";
import {StyledSelect} from "../styles/components/StyledMUI";
import {StyledLabel} from "../styles/components/StyledApp";
import {useTranslation} from "react-i18next";

const RowsCountSelector: FC = () => {
    const dispatch = useAppDispatch()
    const {limit} = useSelector((state: RootState) => state.filters)
    const {t} = useTranslation()

    const showHandler = (e: SelectChangeEvent<unknown>) => {
        dispatch(setPage(1))
        dispatch(setLimit(e.target.value))
    }

    return (
        <div>
            <StyledLabel>{t('Show')}</StyledLabel>
            <StyledSelect
                value={limit}
                variant="standard"
                onChange={showHandler}
            >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
            </StyledSelect>
        </div>
    );
};

export default RowsCountSelector;
