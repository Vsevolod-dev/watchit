import React, {FC, useEffect, useState} from 'react';
import {MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import moment, {Moment} from "moment";
import {useLazyFetchUsersQuery} from "./services/UsersService";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "./redux/store";
import {setDateFrom, setDateTo, setLimit, setPage} from "./redux/slices/filtersSlice";
import {DataGrid, GridColDef} from "@mui/x-data-grid";

const columns: GridColDef[] = [
    {field: "id", headerName: "ID", width: 50},
    {field: "name", headerName: "Имя"},
    {field: "gym_id", headerName: "ID Зала"},
    {field: "photo", headerName: "Фото", width: 150},
    {field: "addDesc", headerName: "Описание", width: 300},
    {field: "trainerCode", headerName: "Код"},
    {field: "instagramRef", headerName: "Ссылка на инст", width: 250},
    {field: "user_info", headerName: "Доп. инфо", width: 300}
];


const App: FC = () => {

    const dispatch = useAppDispatch()
    const {dateFrom, dateTo, page, limit} = useSelector((state: RootState) => state.filters)
    const [date, setDate] = useState('today');

    const [fetchUsers, result, lastPromiseInfo] = useLazyFetchUsersQuery()

    const dateRangeHandler = (e: SelectChangeEvent) => {
        setDate(e.target.value)
        switch (e.target.value) {
            case 'today':
                dispatch(setDateFrom(moment().format('DD-MM-YYYY')))
                dispatch(setDateTo(moment().format('DD-MM-YYYY')))
                break
            case 'tomorrow':
                const tomorrowDate = moment().add(1, "days")
                dispatch(setDateFrom(tomorrowDate.format('DD-MM-YYYY')))
                dispatch(setDateTo(tomorrowDate.format('DD-MM-YYYY')))
                break
            case 'yesterday':
                const yesterdayDate = moment().add(-1, "days")
                dispatch(setDateFrom(yesterdayDate.format('DD-MM-YYYY')))
                dispatch(setDateTo(yesterdayDate.format('DD-MM-YYYY')))
                break
        }
    }

    useEffect(() => {
        if (!dateFrom || !dateTo) return
        fetchUsers({
            dateFrom: moment(dateFrom, 'DD-MM-YYYY').format('YYYY-MM-DD'),
            dateTo: moment(dateTo, 'DD-MM-YYYY').format('YYYY-MM-DD'),
            page: page,
            limit: limit
        })
    }, [dateFrom, dateTo, limit])

    return (
        <div>
            <Select
                value={date}
                onChange={dateRangeHandler}
            >
                <MenuItem value={'today'}>Сегодня</MenuItem>
                <MenuItem value={'tomorrow'}>Завтра</MenuItem>
                <MenuItem value={'yesterday'}>Вчера</MenuItem>
            </Select>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                    label="От"
                    inputFormat="DD.MM.YYYY"
                    value={moment(dateFrom, 'DD-MM-YYYY')}
                    onChange={(val: Moment | null) => {
                        if (val) {
                            dispatch(setDateFrom(val.format('DD-MM-YYYY')))
                        }
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                <DesktopDatePicker
                    label="До"
                    inputFormat="DD.MM.YYYY"
                    value={moment(dateTo, 'DD-MM-YYYY')}
                    onChange={(val: Moment | null) => {
                        if (val) {
                            dispatch(setDateTo(val.format('DD-MM-YYYY')))
                        }
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <>
                Показывать
                <Select
                    value={limit}
                    onChange={(e: SelectChangeEvent) => dispatch(setLimit(e.target.value))}
                >
                    <MenuItem value={'5'}>5</MenuItem>
                    <MenuItem value={'10'}>10</MenuItem>
                    <MenuItem value={'20'}>20</MenuItem>
                </Select>
            </>
            {result.data && limit &&
              <div style={{height: (parseInt(limit) * 52 + 140), width: '100%'}}>
                <DataGrid
                  rows={result.data.apiResponse}
                  columns={columns}
                  pageSize={parseInt(limit)}
                />
              </div>
            }
        </div>
    );
}

export default App;
