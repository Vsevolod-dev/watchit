import React, {FC} from 'react';
import {TablePagination} from "@mui/material";
import {LabelDisplayedRowsArgs} from "@mui/material/TablePagination/TablePagination";
import {useTranslation} from "react-i18next";
import {FetchUsersResponse} from "../../services/UsersService";
import {useAppDispatch} from "../../redux/store";
import {setPage} from "../../redux/slices/filtersSlice";
import TablePaginationActions from "./TablePaginationActions";

type PaginationProps = {
    result: FetchUsersResponse,
    limit: number,
    page: number,
    colSpan: number
}


const Pagination: FC<PaginationProps> = ({result, limit, page, colSpan}) => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()

    const defaultLabelDisplayedRows = ({ from, to, count, page }: LabelDisplayedRowsArgs) => {
        const totalCount =  result.totalCount || 0

        from = page === 0 ? 1 : (limit * (page === 0 ? (page + 1) : page) + 1)
        to = (page + 1) * limit > totalCount ? totalCount : (page + 1) * limit
        count = totalCount || 1

        return `${from}–${to} ${t('of')} ${count !== -1 ? count : `more than ${to}`}`;
    }

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        dispatch(setPage(page + 1))
    }

    if (!result.totalCount) return <></> // Todo: add loader

    return (
        <TablePagination
            rowsPerPageOptions={[]}
            colSpan={colSpan}
            count={result.totalCount}
            rowsPerPage={limit}
            labelDisplayedRows={defaultLabelDisplayedRows}
            page={page - 1}
            onPageChange={handleChangePage}
            ActionsComponent={TablePaginationActions}
        />
    );
};

export default Pagination;
