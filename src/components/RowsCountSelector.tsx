import {FC} from 'react';
import {MenuItem, SelectChangeEvent} from "@mui/material";
import {filtersAction} from "../redux/slices/filtersSlice";
import {useAppSelector} from "../redux/store";
import {StyledSelect} from "../styles/components/StyledMUI";
import {StyledLabel} from "../styles/components/StyledApp";
import {useTranslation} from "react-i18next";
import {useActionCreators} from '../hooks/useActionCreators'

const RowsCountSelector: FC = () => {
    const limit = useAppSelector(state => state.filters.limit)
    const {t} = useTranslation()
    const actions = useActionCreators(filtersAction)

    const showHandler = (e: SelectChangeEvent<unknown>) => {
        actions.setPage(1)
        actions.setLimit(e.target.value)
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
