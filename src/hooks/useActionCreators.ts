import { ActionCreatorsMapObject, bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useAppDispatch } from "../redux/store";

export const useActionCreators = (action: ActionCreatorsMapObject) => {
    const dispatch = useAppDispatch()

    return useMemo(() => bindActionCreators(action, dispatch), [])
}