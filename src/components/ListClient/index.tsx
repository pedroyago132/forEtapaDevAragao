import * as React from "react";
import { useContext } from "react";
import { AppContext } from "../../state";
import {
  StyledAreaEmployee,
  StyledAreaInfo,
  StyledAreaItemList,
  Accordiona,
  StyledAreaAccordion,
} from "./style";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

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
import EmployeeItemClient from "../EmployeeItemClient";

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
  handleOpenImage: () => void;
  employeeList: IEmployee[];
  user: Partial<UserData>;
}

export default function ListClientEmployee(props: OpenImageInterface) {
  console.log(props, 'props')
  const { state, dispatch } = useContext(AppContext);
  const [openImage, setOpenImage] = React.useState(false);
  const [sendDate, setSendDate] = React.useState('');
  const handleOpenImage = () => {
    setOpenImage(true);
  }
  const handleCloseImage = () => setOpenImage(false);

  const cnpjUser =
    props.user.cnpj !== undefined ? parseInt(props.user.cnpj, 10) : undefined;

  const filteredEmployees = props.employeeList.filter((employee) => {
    return employee.company == cnpjUser;
  });

  const groupedEmployees: { [key: string]: IEmployee[] } = {};

  filteredEmployees.forEach((employee) => {
    if (!groupedEmployees[employee.group]) {
      groupedEmployees[employee.group] = [];
    }
    groupedEmployees[employee.group].push(employee);
  });

console.log(groupedEmployees,'EMPLOYEE')
  return (
    <>
      {Object.keys(groupedEmployees).map(
        (group:string, index: React.Key | null | undefined) => (
         <EmployeeItemClient handleOpenImage={handleOpenImage} group={group} groupedEmployees={groupedEmployees} index={index}  /> 
        )
      )}
    </>
  );
}
