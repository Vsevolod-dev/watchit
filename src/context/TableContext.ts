import {createContext} from "react";

const TableContext = createContext<any[]>([])

export const TableContextProvider = TableContext.Provider
export default TableContext