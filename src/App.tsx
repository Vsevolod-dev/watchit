import React, {FC} from 'react';
import DateFilters from "./components/DateFilters";
import RowsCountSelector from "./components/RowsCountSelector";
import DataTable from "./components/DataTable";
import Search from "./components/Search";
import StyledApp from "./styles/components/StyledApp";
import Language from "./components/Language";
import {TableContextProvider} from "./context/TableContext";
import {GridColDef} from "@mui/x-data-grid";

const columns: GridColDef[] = [
    {field: "id", headerName: "ID", width: 40},
    {field: "created", headerName: "Дата создания", width: 170},
    {field: "name", headerName: "Имя"},
    {field: "gym_id", headerName: "ID Зала"},
    {field: "photo", headerName: "Фото", width: 150},
    {field: "trainerCode", headerName: "Код"},
];

const App: FC = () => {
    return (
        <TableContextProvider value={[{field: "expand", headerName: "", width: 10}, ...columns]}>
            <StyledApp.Wrap>
                <StyledApp.Row>
                    <DateFilters/>
                    <Language/>
                </StyledApp.Row>
                <StyledApp.Row>
                    <RowsCountSelector/>
                    <Search/>
                </StyledApp.Row>
                <DataTable/>
            </StyledApp.Wrap>
        </TableContextProvider>
    );
}

export default App;
