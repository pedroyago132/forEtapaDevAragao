import { Modal, Box, Typography, Accordion, AccordionSummary, AccordionDetails, Button } from "@mui/material"
import { StyledAreaModal, StyledItemInfo, StyledAreaInfoItem, StyledAreaInfoItem2, StyledAreaList, StyledAreaItemList, StyledAreaEmployee, StyledAreaInfo, StyledAreaEmployee2, StyledItemList } from "./style"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Dispatch, FC, SetStateAction, useState } from "react"
import { accordionData, companyInfo } from "./data";
import { handleOpen, handleClose } from "./methods";


interface IProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const ClientModal: FC<IProps> = (props) => {

    const { open, setOpen } = props

    return (
        <>
            <Modal
                open={open}
                onClose={() => handleClose(setOpen, open)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    <StyledAreaModal>
                        {Object.entries(companyInfo).map(([label, value], index) => (
                            <StyledItemInfo key={index}>
                                <StyledAreaInfoItem>
                                    <Typography fontSize={14} fontWeight={600} color={'black'}>
                                        {label}:
                                    </Typography>
                                </StyledAreaInfoItem>
                                <StyledAreaInfoItem2>
                                    <Typography fontSize={14} fontWeight={400} color={'grey'}>
                                        {value}
                                    </Typography>
                                </StyledAreaInfoItem2>
                            </StyledItemInfo>
                        ))}
                    </StyledAreaModal>

                    <StyledAreaModal  >



                        <Typography fontSize={19} fontWeight={600} color={'white'} alignSelf={'center'} margin={2} >
                            Listas Enviadas
                        </Typography>
                        <StyledAreaList>

                            <Accordion style={{ backgroundColor: 'white' }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    {Object.entries(accordionData).slice(0, 3).map(([label, value]) => (
                                        <StyledAreaItemList key={label}>
                                            <Typography variant="body1">
                                                {label}:
                                            </Typography>
                                            <Typography variant="body1">
                                                {value}
                                            </Typography>
                                        </StyledAreaItemList>
                                    ))}
                                </AccordionSummary>
                                <AccordionDetails style={{ minHeight: 300 }}>
                                    <Accordion style={{ backgroundColor: 'white' }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            {Object.entries(accordionData).slice(3, 5).map(([label, value]) => (
                                                <StyledAreaItemList key={label}>
                                                    <Typography variant="body1">
                                                        {label}:
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {value}
                                                    </Typography>
                                                </StyledAreaItemList>
                                            ))}
                                        </AccordionSummary>
                                        <AccordionDetails style={{ minHeight: 300, display: 'flex' }}>
                                            <StyledAreaEmployee>
                                                {Object.entries(accordionData).slice(5).map(([label, value]) => (
                                                    <StyledAreaInfo key={label}>
                                                        <Typography variant="body1">
                                                            {label}:
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            {value}
                                                        </Typography>
                                                    </StyledAreaInfo>
                                                ))}
                                            </StyledAreaEmployee>
                                        </AccordionDetails>
                                    </Accordion>
                                </AccordionDetails>
                            </Accordion>

                            <StyledItemList onClick={() => handleOpen(setOpen, open)} >

                            </StyledItemList>
                        </StyledAreaList>
                    </StyledAreaModal>
                </Box>
            </Modal>
        </>
    )
}