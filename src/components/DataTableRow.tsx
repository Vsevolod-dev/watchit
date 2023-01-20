import React, {FC, useContext} from 'react';
import {IconButton, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Collapse from "@mui/material/Collapse";
import TableContext from "../context/TableContext";
import {UserType} from "../types";


type DataTableRowType = {
    row: UserType
    shownColumns: string[]
}

const collapsedColumns = [
    {field: "addDesc", headerName: "Описание"},
    {field: "instagramRef", headerName: "Ссылка на инст"},
    {field: "user_info", headerName: "Доп. инфо"}
]

const DataTableRow: FC<DataTableRowType> = ({row, shownColumns}) => {
    const [open, setOpen] = React.useState(false);
    const columns = useContext(TableContext)

    return (
        <>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                {columns.map(column => {
                    if (!shownColumns.includes(column.field)) return false
                    // @ts-ignore
                    return <TableCell key={column.field}>{row[column.field]}</TableCell>
                })
                }

            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={columns.length + 2}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Table size="small" aria-label="purchases">
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
