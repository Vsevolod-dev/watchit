import {FC, useContext, useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../redux/store";
import {useLazyFetchUsersQuery} from "../services/UsersService";
import moment from "moment/moment";
import {Paper, Table, TableBody, TableContainer} from "@mui/material";
import {UserType} from "../types";
import {setShownColumns} from "../redux/slices/uiSlice";
import TableContext from "../context/TableContext";
import DataTableRow from "./DataTableRow";
import DataTableHead from "./DataTableHead";
import DataTableFooter from "./DataTableFooter";
import { useTranslation } from 'react-i18next';


const DataTable: FC = () => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    const {dateFrom, dateTo, page, limit, search, sort, searchColumns} = useSelector((state: RootState) => state.filters)
    const {shownColumns} = useSelector((state: RootState) => state.ui)
    const [fetchUsers, result] = useLazyFetchUsersQuery()
    let columns = useContext(TableContext)

    useEffect(() => {
        dispatch(setShownColumns(columns.map(col => col.field)))
    }, [])

    useEffect(() => {
        if (!dateFrom || !dateTo || !limit) return
        fetchUsers({
            dateFrom: moment(dateFrom, 'DD-MM-YYYY').format('YYYY-MM-DD'),
            dateTo: moment(dateTo, 'DD-MM-YYYY').add(1, "day").format('YYYY-MM-DD'),
            page,
            limit,
            sort,
            search,
            searchColumns
        })
    }, [dateFrom, dateTo, limit, page, search, sort])

    useEffect(() => {
        if (!dateFrom || !dateTo || !limit) return

        if (search !== undefined && search !== '') fetchUsers({
            dateFrom: moment(dateFrom, 'DD-MM-YYYY').format('YYYY-MM-DD'),
            dateTo: moment(dateTo, 'DD-MM-YYYY').add(1, "day").format('YYYY-MM-DD'),
            page,
            limit,
            sort,
            search,
            searchColumns
        })
    }, [searchColumns])

    if (!result.data || !shownColumns || !result.data.totalCount || !limit || !page) {
        if (result.data && result.data.totalCount === 0) return <h1>{t('No results found')}</h1>
         else return <h1>{t('Loading')}...</h1>
    }

    let rows = result.data.apiResponse

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }}>
                <DataTableHead/>
                <TableBody>
                    {rows.map((row: UserType, index: number) => (
                        <DataTableRow key={row.id} row={row} index={index} shownColumns={shownColumns.filter(col => col !== 'expand')} />
                    ))}
                </TableBody>
                <DataTableFooter data={result.data}/>
            </Table>
        </TableContainer>
    )
};

export default DataTable;
