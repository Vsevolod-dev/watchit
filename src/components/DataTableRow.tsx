import React, {FC, useContext} from 'react';
import {IconButton, styled, Table, TableBody, TableCell, TableHead, TableRow, TableRowProps } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Collapse from "@mui/material/Collapse";
import TableContext from "../context/TableContext";
import {UserType} from "../types";
import moment from 'moment';
import {useAppSelector } from '../redux/store';


type DataTableRowType = {
    row: UserType
    shownColumns: string[]
    index: number
}

const collapsedColumns = [
    {field: "addDesc", headerName: "Описание"},
    {field: "instagramRef", headerName: "Ссылка на инст"},
    {field: "user_info", headerName: "Доп. инфо"}
]

interface StyledTableRowProps extends TableRowProps {
    index: number
}

const StyledTableRow = styled(TableRow)<StyledTableRowProps>(({ theme, index }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: index % 2 === 0 ? theme.palette.action.hover : 'white',
      },
}))

const DataTableRow: FC<DataTableRowType> = ({row, shownColumns, index}) => {
    const [open, setOpen] = React.useState(false);
    const columns = useContext(TableContext)
    const dateFormat = useAppSelector(state => state.ui.dateFormat)

    return (
        <>
            <StyledTableRow sx={{'& > *': {borderBottom: 'unset'}}} index={index}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                {columns.map((column: {field: string, headerName: string, width: number}) => {
                    if (!shownColumns.includes(column.field)) return false

                    if (column.field === 'created') {                        
                        const date = moment(row[column.field], 'YYYY-MM-DD HH:mm:ss')
                        return <TableCell key={column.field}>{date.format(dateFormat)}</TableCell>
                    }

                    return <TableCell key={column.field}>{row[column.field as keyof UserType]}</TableCell>                    
                })
                }

            </StyledTableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={columns.length + 2}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    {collapsedColumns.map(col => <TableCell
                                        key={col.field}>{col.headerName}</TableCell>)}
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
};

export default DataTableRow;
