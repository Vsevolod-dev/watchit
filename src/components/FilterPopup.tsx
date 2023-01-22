import React, {FC} from 'react';
import FilterListIcon from "@mui/icons-material/FilterList";
import {Box, Button, Popover, Switch} from "@mui/material";
import {PopoverOrigin} from "@mui/material/Popover/Popover";
import {useAppDispatch} from "../redux/store";
import {AnyAction} from "@reduxjs/toolkit";

type FilterPopupType = {
    style: Object
    anchorOrigin: PopoverOrigin
    transformOrigin: PopoverOrigin
    actualColumns: string[]
    allCols: any[]
    setFn: (cols: string[]) => AnyAction
}

const FilterPopup: FC<FilterPopupType> = (props) => {
    const dispatch = useAppDispatch()
    const {style, anchorOrigin, transformOrigin, actualColumns, allCols, setFn} = props
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <span>
            <Button sx={{...style, color: 'black'}} onClick={handleClick} aria-describedby={id}>
                <FilterListIcon/>
            </Button>
            <Popover
                id={id}
                open={open}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
                onClose={handleClose}
                anchorEl={anchorEl}
            >
                <Box sx={{p: 2}}>
                    {allCols.map(col => {

                        const changeHandler = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                            if (checked) {
                                dispatch(setFn([...actualColumns, col.field]))
                            } else {
                                dispatch(setFn(actualColumns.filter(ac => ac !== col.field)))
                            }
                        }

                        return <div key={col.field}>
                            <Switch checked={actualColumns.includes(col.field)} onChange={changeHandler}/>
                            <span>{col.headerName}</span>
                        </div>
                    })
                    }
                </Box>
            </Popover>
        </span>
    );
};

export default FilterPopup;
