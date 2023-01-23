import { MenuItem, SelectChangeEvent } from '@mui/material';
import {FC} from 'react'
import { useTranslation } from 'react-i18next';
import { setDateFormat } from '../redux/slices/uiSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { StyledLabel } from '../styles/components/StyledApp';
import {StyledSelect} from "../styles/components/StyledMUI";

const FORMATS = [
    {value: 'DD-MM-YYYY HH:mm:ss', text: 'DD-MM-YYYY HH:mm:ss'},
    {value: 'YYYY-MM-DD HH:mm:ss', text: 'YYYY-MM-DD HH:mm:ss'}
]

const DateFormat: FC = () => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    const dateFormat = useAppSelector(state => state.ui.dateFormat)

    const dateFromatChangeHandler = (event: SelectChangeEvent<unknown>) => {
        if (typeof event.target.value !== 'string') return
        
        dispatch(setDateFormat(event.target.value))
    }

    return (
        <div>
            <StyledLabel>{t('Date format')}:</StyledLabel>
            <StyledSelect
                value={dateFormat}
                variant="standard"
                onChange={dateFromatChangeHandler}
            >
                {FORMATS.map((option, index: number) => <MenuItem key={index} value={option.value}>{t(option.text)}</MenuItem>)}
            </StyledSelect>
        </div>
    )
}

export default DateFormat;