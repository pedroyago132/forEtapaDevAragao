import * as React from "react";
import { useContext } from "react";
import { AppContext } from "../../state";
import {
  StyledAreaEmployee,
  StyledAreaInfo,
  StyledAreaItemList,
  Details,
  StyledAreaAccordion,
} from "./style";


import {
  Button,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ImageDocumento from "../../assets/images/document.jpg";
import { IEmployee } from "../../interfaces";
import EmployeeItemList from "../EmployeeItem";

interface UserData {
  address: string;
  cnpj: string;
  email: string;
  ip: string;
  nomeFantasia: string;
  password: string;
  phone: string;
  razaoSocial: string;
  role: string;
}

interface OpenImageInterface {
  index: React.Key | null | undefined;
  groupedEmployees: { [key: string]: IEmployee[] };
  group:string; // ou outra estrutura mais específica
  handleOpenImage: () => void;
}

export default function EmployeeItemClient(props: OpenImageInterface) {
  const { state, dispatch } = useContext(AppContext);

  const openSnackbar = (severity: string, message: string) => {
  
  };

  const renderCondition = (condition:number) => {
    if(condition == 1){
      return '24 horas'
    }
    else if(condition == 2){
      return '48 horas'
    } else{
      return '5 dias úteis'
    }
  }


  return (

          <Accordion style={{marginTop:15}} key={props.index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              style={{ flexDirection: "row" }}
              aria-controls={`panel-${props.index}-content`}
              id={`panel-${props.index}-header`}
            >
              <StyledAreaAccordion>
                <Typography>
                  Lista: {props.group.slice(0, 19)} 
                </Typography>
              </StyledAreaAccordion>
              <StyledAreaAccordion>
                <Typography>
                   Data de envio:{" "}
                  {props.groupedEmployees[props.group][0].uf}
                </Typography>
              </StyledAreaAccordion>

              <StyledAreaAccordion>
                <Typography>
                   Prazo:{" "}
                   {renderCondition((props.groupedEmployees[props.group][0] as IEmployee).condition)}
                </Typography>
              </StyledAreaAccordion>
            </AccordionSummary>
            <AccordionDetails>
              {props.groupedEmployees[props.group].map(
                (employee: IEmployee, employeeIndex: number) => (
                 
                  <>
            
                    <Accordion style={{ backgroundColor: "white" }}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                  
                          <Typography
                            fontSize={14}
                            fontWeight={600}
                            color={"black"}
                          >
                            Nome:
                          </Typography>

                          <Typography
                            fontSize={14}
                            fontWeight={400}
                            color={"grey"}
                          >
                            {employee.name}
                          </Typography>
                   

                 
                      </AccordionSummary>
                     <Details>
                        <EmployeeItemList  group={props.group} employeeIndex={employeeIndex} handleOpenImage={props.handleOpenImage} client={true} openSnackbar={openSnackbar} employee={employee} groupedEmployees={props.groupedEmployees} />
                        </Details>
                    </Accordion>
                  </>
                )
              )}
            </AccordionDetails>
          </Accordion>
  );
}
