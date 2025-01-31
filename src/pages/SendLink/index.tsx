import * as React from "react";
import { useContext } from "react";
import { AppContext } from "../../state";

import {
  ButtonRegister,
  Body,
  Title,
  TextInput,
  Input,
  StyledInput,
} from "./style";
import { customerAction } from "../../state/actions";
import { Typography } from "@mui/material";
import { IEmployee, IUser } from "../../interfaces";
import { createUser } from "./methods";
import {  AlertColor } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  Snackbar,
  Alert,
  Modal,
  Box,
  AccordionDetails,
  AccordionSummary,
  InputLabel,
  MenuItem,
  FormControl,
  Button,
} from "@mui/material";

export default function SendLink() {
  const { state, dispatch } = useContext(AppContext);
  const [email, setEmail] = React.useState('');
  const [typeUser, setTypeUser] = React.useState('Client');
  const [snackbarState, setSnackbarState] = React.useState({
    isOpen: false,
    vertical: "top",
    horizontal: "right",
    severity: "success",
    message: "",
  });

  const { vertical, horizontal, isOpen, severity, message } = snackbarState;

  const userData:IUser = {
    password: "",
    role: typeUser, // Não é obrigatório, então é uma string vazia
    company: 0, // Não é obrigatório, então é uma string vazia
    razaoSocial: "", // Não é obrigatório, então é uma string vazia
    nomeFantasia: "", // Não é obrigatório, então é uma string vazia
    cnpj: 0, // Se não for fornecido, assume o valor 0
    address: "", // Não é obrigatório, então é uma string vazia
    phone: 0, // Se não for fornecido, assume o valor 0
    email: email,
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {

    setTypeUser(event.target.value as string);
  };
  const closeSnackbar = () => {
    setSnackbarState({ ...snackbarState, isOpen: false });
  };

  const inputEmail = (event: any) => {
    setEmail(event.target.value);
  };

  const openSnackbar = (severity: string, message: string) => {
    setSnackbarState({
      isOpen: true,
      severity: severity,
      message: message,
      vertical: "top",
      horizontal: "right",
    });
  };


  const postData = async () => {
    try {
      const response = await createUser(userData).then(() => openSnackbar('success','Link Enviado'))
      console.log("suceess", response);
    } catch (error) {
      openSnackbar('error','Falha ao enviar link, verifique a internet')
    }
  };

  return (
    <Body>
      <Typography  position={'absolute'} top={'20%'} variant="h5" align="center">
        Gerar Link
      </Typography>

      <StyledInput
        id={`outlined`}
        name={"Email"}
        value={email}
        onChange={inputEmail}
        label={"Email"} // Use translation, if available
        variant="outlined"
        color="primary"
      />

<FormControl style={{width:380}}>
              <InputLabel id="demo-simple-select-label">
                TIPO DE CONTA
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={typeUser}
                label="Condição"
                onChange={handleChangeSelect}
              >
                <MenuItem value={'Client'}>Cliente / Empresa</MenuItem>
                <MenuItem value={'Admin'}>Administrador</MenuItem>
              </Select>
            </FormControl>

      <ButtonRegister
        variant="contained"
        color="primary"
        onClick={() => postData()}
      >
        ENVIAR LINK
      </ButtonRegister>

      <Snackbar
        anchorOrigin={{
          vertical: vertical as "top" | "bottom",
          horizontal: horizontal as "left" | "center" | "right",
        }}
        open={isOpen}
        autoHideDuration={6000}
        onClose={closeSnackbar}
      >
        <Alert
          onClose={closeSnackbar}
          severity={severity as AlertColor | undefined}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Body>
  );
}
