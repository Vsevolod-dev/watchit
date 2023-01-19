import React, {FC} from 'react';
import {MenuItem, Select} from "@mui/material";
import {useTranslation} from "react-i18next";
import England from '../assets/flags/gb.svg'
import Russia from '../assets/flags/ru.svg'

type LngsType = {
    [key: string]: {
        nativeName: string
        value: string
        src: string
    }
}

const lngs: LngsType = {
    ru: { nativeName: 'Russian', value: 'ru', src: Russia},
    en: { nativeName: 'English', value: 'en', src: England},
}

const Language: FC = () => {
    const {i18n} = useTranslation()
    return (
        <Select
            value={i18n.resolvedLanguage}
            variant={'standard'}
            onChange={(lng) => i18n.changeLanguage(lng.target.value)}
        >
            {
                Object.keys(lngs).map((lng) =>
                    <MenuItem value={lngs[lng].value} key={lngs[lng].value}>
                        <img width={20} src={lngs[lng].src} alt={lngs[lng].value} />{" "}
                    </MenuItem>)
            }
        </Select>
    );
};

export default Language;
