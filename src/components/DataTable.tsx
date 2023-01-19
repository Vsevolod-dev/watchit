import React, {FC, useContext, useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../redux/store";
import {useLazyFetchUsersQuery} from "../services/UsersService";
import moment from "moment/moment";
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow,
    TableSortLabel
} from "@mui/material";
import {UserType} from "../types";
import Pagination from "./Pagination";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import {setSort} from "../redux/slices/filtersSlice";
import TableContext from "../context/TableContext";

const collapsedColumns = [
    {field: "addDesc", headerName: "Описание"},
    {field: "instagramRef", headerName: "Ссылка на инст"},
    {field: "user_info", headerName: "Доп. инфо"}
]

const Row = (props: { row: UserType }) => {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const columns = useContext(TableContext)

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.created}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.gym_id}</TableCell>
                <TableCell>{row.photo}</TableCell>
                <TableCell>{row.trainerCode}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns.length + 2}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        {collapsedColumns.map(col => <TableCell key={col.field}>{col.headerName}</TableCell>)}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                        <TableRow key={row.id}>
                                            <TableCell>{row.addDesc}</TableCell>
                                            <TableCell>{row.instagramRef}</TableCell>
                                            <TableCell>{row.user_info}</TableCell>
                                        </TableRow>
                                </TableBody>
                            </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

const DataTable: FC = () => {
    const dispatch = useAppDispatch()
    const {dateFrom, dateTo, page, limit, search, sort, searchColumns} = useSelector((state: RootState) => state.filters)
    const [fetchUsers, result] = useLazyFetchUsersQuery()
    const columns = useContext(TableContext)

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
    }, [dateFrom, dateTo, limit, page, search, sort, searchColumns])

    const sortHandler = (column: string) => {
        // setSort({
        //     column,
        //     order: (sort && sort.order === 'asc') ? 'desc' : 'asc'
        // })
        dispatch(setSort({
            column,
            order: (sort && sort.order === 'asc') ? 'desc' : 'asc'
        }))
    }

    if (!result.data) return <>Loading...</> // Todo: add loader

    let rows = result.data.apiResponse

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }}>
                <TableHead>
                    <TableRow>
                        {columns.map(column => (
                            <TableCell
                                key={column.field}
                                width={column.width}
                                sortDirection={(sort && sort.column === column.field) ? sort.order : false}
                            >
                                <TableSortLabel
                                    active={sort && sort.column === column.field}
                                    direction={sort && sort.column === column.field ? sort.order : 'asc'}
                                    onClick={() => sortHandler(column.field)}
                                >
                                    {column.headerName}
                                </TableSortLabel>
                            </TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row: UserType) => (
                        <Row key={row.id} row={row}/>
                    ))}
                </TableBody>
                {result.data.totalCount && limit && page && <TableFooter>
                    <TableRow>
                      <Pagination result={result.data} limit={limit} page={page} colSpan={columns.length}/>
                    </TableRow>
                </TableFooter>}
            </Table>
        </TableContainer>
    )
};

export default DataTable;
