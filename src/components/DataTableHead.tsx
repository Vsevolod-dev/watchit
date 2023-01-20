import React, {FC, useContext} from 'react';
import {TableCell, TableHead, TableRow, TableSortLabel} from "@mui/material";
import TableContext from "../context/TableContext";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../redux/store";
import {setSort} from "../redux/slices/filtersSlice";

const DataTableHead: FC = () => {
    const dispatch = useAppDispatch()
    const {sort, shownColumns} = useSelector((state: RootState) => state.filters)
    let columns = useContext(TableContext)

    const sortHandler = (column: string) => {
        dispatch(setSort({
            column,
            order: (sort && sort.order === 'asc') ? 'desc' : 'asc'
        }))
    }

    if (!shownColumns) return <></>

    return (
        <TableHead>
            <TableRow>
                {columns.map(column => {
                    if (!shownColumns.includes(column.field)) return
                    return <TableCell
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
                })
                }
            </TableRow>
        </TableHead>
    );
};

export default DataTableHead;
