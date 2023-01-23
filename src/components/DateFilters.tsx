import {FC, useState} from 'react';
import {MenuItem, SelectChangeEvent, TextField} from "@mui/material";
import {filtersAction} from "../redux/slices/filtersSlice";
import moment, {isMoment} from "moment/moment";
import {useAppSelector} from "../redux/store";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {StyledDesktopDatePicker, StyledSelect} from "../styles/components/StyledMUI";
import {useTranslation} from "react-i18next";
import {useActionCreators} from '../hooks/useActionCreators'

const SelectOptions = [
    {value: 'today', text: 'today'},
    {value: 'tomorrow', text: 'tomorrow'},
    {value: 'yesterday', text: 'yesterday'},
]

const DateFilters: FC = () => {
    const [date, setDate] = useState('today');
    const {dateFrom, dateTo} = useAppSelector(state => state.filters)
    const {t} = useTranslation()
    const actions = useActionCreators(filtersAction)

    const dateRangeHandler = (event: SelectChangeEvent<unknown>) => {
        if (typeof event.target.value !== 'string') return

        setDate(event.target.value)
        switch (event.target.value) {
            case 'today':
                actions.setDateFrom(moment().format('DD-MM-YYYY'))
                actions.setDateTo(moment().format('DD-MM-YYYY'))
                break
            case 'tomorrow':
                const tomorrowDate = moment().add(1, "days")
                actions.setDateFrom(tomorrowDate.format('DD-MM-YYYY'))
                actions.setDateTo(tomorrowDate.format('DD-MM-YYYY'))
                break
            case 'yesterday':
                const yesterdayDate = moment().add(-1, "days")
                actions.setDateFrom(yesterdayDate.format('DD-MM-YYYY'))
                actions.setDateTo(yesterdayDate.format('DD-MM-YYYY'))
                break
        }
    }

    const setDateFromHandler = (value: unknown) => {
        if (!isMoment(value)) return
        actions.setDateFrom(value.format('DD-MM-YYYY'))

    }

    const setDateToHandler = (value: unknown) => {
        if (!isMoment(value)) return
        actions.setDateTo(value.format('DD-MM-YYYY'))
    }

    return (
        <div>
            <StyledSelect
                value={date}
                variant="standard"
                onChange={dateRangeHandler}
            >
                {SelectOptions.map((option, index: number) => <MenuItem key={index} value={option.value}>{t(option.text)}</MenuItem>)}
            </StyledSelect>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <StyledDesktopDatePicker
                    label={t("From")}
                    inputFormat="DD.MM.YYYY"
                    value={moment(dateFrom, 'DD-MM-YYYY')}
                    onChange={setDateFromHandler}
                    renderInput={(params) => <TextField variant={'standard'} {...params} />}
                />
                <StyledDesktopDatePicker
                    label={t("To")}
                    inputFormat="DD.MM.YYYY"
                    value={moment(dateTo, 'DD-MM-YYYY')}
                    onChange={setDateToHandler}
                    renderInput={(params) => <TextField variant={'standard'} {...params} />}
                />
            </LocalizationProvider>
        </div>
    );
};

export default DateFilters;
