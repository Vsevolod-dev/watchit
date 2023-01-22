import {FC, useContext} from 'react';
import {TableFooter, TableRow} from "@mui/material";
import FilterPopup from "./FilterPopup";
import {setShownColumns} from "../redux/slices/uiSlice";
import Pagination from "./Pagination/Pagination";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import TableContext from "../context/TableContext";
import {FetchUsersResponse} from "../services/UsersService";


type DataTableFooterType = {
    data: FetchUsersResponse
}

const DataTableFooter: FC<DataTableFooterType> = ({data}) => {
    const {page, limit} = useSelector((state: RootState) => state.filters)
    const {shownColumns} = useSelector((state: RootState) => state.ui)
    let columns = useContext(TableContext)

    if (!shownColumns) return <></>

    return (
        <TableFooter>
            <TableRow>
                <td style={{paddingLeft: '10px'}}>
                    <FilterPopup
                        style={{cursor: "pointer", background: "inherit", border: "none"}}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        actualColumns={shownColumns}
                        allCols={columns.filter(col => col.field !== 'expand')}
                        setFn={setShownColumns}
                    />
                </td>
                <Pagination result={data} limit={limit} page={page} colSpan={columns.length}/>
            </TableRow>
        </TableFooter>
    );
};

export default DataTableFooter;
