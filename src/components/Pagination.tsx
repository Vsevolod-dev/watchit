import React, {FC} from 'react';
import {Box, IconButton, TablePagination, useTheme} from "@mui/material";
import {LabelDisplayedRowsArgs} from "@mui/material/TablePagination/TablePagination";
import {TablePaginationActionsProps} from "@mui/material/TablePagination/TablePaginationActions";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import {useTranslation} from "react-i18next";
import {FetchUsersResponse} from "../services/UsersService";
import {useAppDispatch} from "../redux/store";
import {setPage} from "../redux/slices/filtersSlice";

type PaginationProps = {
    result: FetchUsersResponse,
    limit: number,
    page: number,
    colSpan: number
}

const TablePaginationActions = (props: TablePaginationActionsProps) => {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>, totalCount: number) => {
        onPageChange(event, Math.ceil(totalCount / rowsPerPage) - 1);
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={count <= (page + 1) * rowsPerPage}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={(e) => handleLastPageButtonClick(e, count)}
                disabled={count <= (page + 1) * rowsPerPage}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
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
