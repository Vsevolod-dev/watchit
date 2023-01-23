import {FC, useContext} from 'react';
import {TableCell, TableHead, TableRow, TableSortLabel} from "@mui/material";
import TableContext from "../context/TableContext";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {filtersAction} from "../redux/slices/filtersSlice";

const DataTableHead: FC = () => {
    const dispatch = useAppDispatch()
    const {sort} = useAppSelector(state => state.filters)
    const shownColumns = useAppSelector(state => state.ui.shownColumns)
    let columns = useContext(TableContext)

    const sortHandler = (column: string) => {
        dispatch(filtersAction.setSort({
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
