import { Typography } from "@mui/material"
import { StyledContainerCliente, StyledAreaCod } from "./style"
import { Dispatch, FC, SetStateAction, useState } from "react";
import { handleOpen } from "./methods";

interface IProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const Clientes: FC<IProps> = (props) => {

    const { open, setOpen } = props

    return (
        <>
            <Typography variant="h4">Clientes</Typography>
            <StyledContainerCliente onClick={() => handleOpen(setOpen, true)} >
                <StyledAreaCod>
                    <Typography variant="body1" >
                        Código
                    </Typography>
                    <Typography variant="body1" >
                        00034
                    </Typography>
                </StyledAreaCod>
                <StyledAreaCod>
                    <Typography variant="body1" >
                        Nome Empresa
                    </Typography>
                    <Typography variant="body1" >
                        Habbi´s
                    </Typography>
                </StyledAreaCod>
                <StyledAreaCod>
                </StyledAreaCod>
            </StyledContainerCliente>
        </>
    )
}