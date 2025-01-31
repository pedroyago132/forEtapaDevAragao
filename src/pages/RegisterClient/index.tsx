import * as React from "react";
import { useContext } from "react";
import { AppContext } from "../../state";

import { SelectChangeEvent } from "@mui/material/Select";
import {
  ButtonRegister,
  Body,
  Title,
  TextInput,
  Input,
  ContainerInput,
} from "./style";
import { customerAction } from "../../state/actions";
import { Typography } from "@mui/material";
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
import { IEmployee, IClient, IUser, IError } from "../../interfaces";
import { createUser, updateUser, validateInputValue } from "./method";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterClient() {
  const { state, dispatch } = useContext(AppContext);
  const [error, setError] = React.useState<IError>({
    error: false,
    message: "",
  });

  const [employee, setEmployee] = React.useState<IUser>({
    razaoSocial: "",
    nomeFantasia: "",
    cnpj: 0,
    address: "",
    phone: 0,
    email: "",
    password: "",

  });
  const [cep, setCep] = React.useState("");
  const [cnpj, setCnpj] = React.useState("");
  const [razaoSocial, setRazaoSocial] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [nomeFantasia, setNomeFantasia] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [complemento, setComplemento] = React.useState("");
  const navigate = useNavigate()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const isError = validateInputValue(name, value);
    if (!isError) {
      setError({
        error: true,
        message: `Error no ${name}, apenas numeros são permitidos`,
      });
    } else {
      setError({
        error: false,
        message: `Valido`,
      });
    }
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(name, "name");
    console.log(value, "value");
  };

  const sucessCreate = () => {
    navigate('/')
  };

  const postData = async () => {
    const cnpjNumber = parseInt(cnpj.replace(/\D/g, ""), 10);
    const phoneTransorfNumber = parseInt(phone.replace(/\D/g, ""), 10);
    const userData: IUser = {
      cnpj: cnpjNumber,
      razaoSocial: razaoSocial,
      address: address,
      phone: phoneTransorfNumber,
      nomeFantasia: nomeFantasia,
      email: email,
      password: password,
     
      
    };
    try {
      const response = await updateUser(email, userData)
        .then((su) => sucessCreate())
        .catch((error) => console.log(error, "error"));
    } catch (error) {
      console.error(`Erro`, error);
    }
  };
  
  const formatCNPJ = (cnpj: string) => {
    // Remove todos os caracteres não numéricos do CNPJ
    const numericCNPJ = cnpj.replace(/\D/g, "");
  
    // Limita a entrada do usuário a 14 dígitos
    const limitedCNPJ = numericCNPJ.slice(0, 14);
  
    // Aplica a formatação com pontos, barras e traços
    if (limitedCNPJ.length <= 2) {
      return limitedCNPJ;
    } else if (limitedCNPJ.length <= 6) {
      return `${limitedCNPJ.slice(0, 2)}.${limitedCNPJ.slice(2)}`;
    } else if (limitedCNPJ.length <= 9) {
      return `${limitedCNPJ.slice(0, 2)}.${limitedCNPJ.slice(2, 5)}.${limitedCNPJ.slice(5)}`;
    } else if (limitedCNPJ.length <= 13) {
      return `${limitedCNPJ.slice(0, 2)}.${limitedCNPJ.slice(2, 5)}.${limitedCNPJ.slice(5, 8)}/${limitedCNPJ.slice(8)}`;
    } else {
      return `${limitedCNPJ.slice(0, 2)}.${limitedCNPJ.slice(2, 5)}.${limitedCNPJ.slice(5, 8)}/${limitedCNPJ.slice(8, 12)}-${limitedCNPJ.slice(12)}`;
    }
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    // Remove todos os caracteres não numéricos do número de celular
    const numericPhoneNumber = phoneNumber.replace(/\D/g, "");

    // Aplica a formatação com guias
    if (numericPhoneNumber.length <= 2) {
      return numericPhoneNumber;
    } else if (numericPhoneNumber.length <= 7) {
      return `(${numericPhoneNumber.slice(0, 2)}) ${numericPhoneNumber.slice(
        2
      )}`;
    } else {
      return `(${numericPhoneNumber.slice(0, 2)}) ${numericPhoneNumber.slice(
        2,
        7
      )}-${numericPhoneNumber.slice(7, 11)}`;
    }
  };

  const formatCEP = (cep: string) => {
    // Remove todos os caracteres não numéricos do CEP
    const numericCEP = cep.replace(/\D/g, "");
  
    // Limita o número de caracteres a 8
    const limitedCEP = numericCEP.slice(0, 8);
  
    // Aplica a formatação com guias
    if (limitedCEP.length <= 5) {
      return limitedCEP;
    } else {
      return `${limitedCEP.slice(0, 5)}-${limitedCEP.slice(5)}`;
    }
  };
  
  const inputRazaoSocial = (event: any) => {
    setRazaoSocial(event.target.value);
  };

  const inputNomeFantasia = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNomeFantasia(event.target.value);
  };

  const inputCNPJ = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCNPJ = formatCNPJ(event.target.value);
    setCnpj(formattedCNPJ);
  };
  const inputAddress = (event: any) => {
    setAddress(event.target.value);
  };

  
  const inputCEP = (event: any) => {
    const formattedCEP = formatCEP(event.target.value);
    setCep(formattedCEP);
  };

  const inputComplemento = (event: any) => {
    setComplemento(event.target.value);
  };


  const inputPhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhoneNumber = formatPhoneNumber(event.target.value);
    setPhone(formattedPhoneNumber);
  };

  const inputEmail = (event: any) => {
    setEmail(event.target.value);
  };

  const inputPassword = (event: any) => {
    setPassword(event.target.value);
  };

  return (
    <Body>
      <Typography variant="h5" align="center">
        CADASTRO
      </Typography>
      <TextInput
        id={`outlined`}
        name={"Razão Social"}
        value={razaoSocial}
        onChange={inputRazaoSocial}
        label={"Razão Social"}
        variant="outlined"
        color="primary"
      />

      <div style={{ height: "20px" }}></div>

      <TextInput
        id={`outlined`}
        name={"Nome Fantasia"}
        value={nomeFantasia}
        onChange={inputNomeFantasia}
        label={"Nome Fantasia"}
        variant="outlined"
        color="primary"
      />

      <div style={{ height: "20px" }}></div>

      <TextInput
        id={`outlined`}
        name={"CNPJ"}
        value={cnpj}
        onChange={inputCNPJ}
        label={"CNPJ"}
        variant="outlined"
        color="primary"
      />

      <div style={{ height: "20px" }}></div>

      <TextInput
        id={`outlined`}
        name={"Endereço"}
        value={address}
        onChange={inputAddress}
        label={"Endereço"}
        variant="outlined"
        color="primary"
      />
      

      <div style={{ height: "20px" }}></div>

      <TextInput
        id={`outlined`}
        name={"Endereço"}
        value={cep}
        onChange={inputCEP}
        label={"CEP"}
        variant="outlined"
        color="primary"
      />
      

      <div style={{ height: "20px" }}></div>

      <TextInput
        id={`outlined`}
        name={"Endereço"}
        value={complemento}
        onChange={inputComplemento}
        label={"Complemento"}
        variant="outlined"
        color="primary"
      />
      

      <div style={{ height: "20px" }}></div>

      <TextInput
        id={`outlined`}
        name={"Telefone"}
        value={phone}
        onChange={inputPhoneNumber}
        label={"Telefone"}
        variant="outlined"
        color="primary"
      />

      <div style={{ height: "20px" }}></div>

      <TextInput
        id={`outlined`}
        name={"E-mail"}
        value={email}
        onChange={inputEmail}
        label={"E-mail"}
        variant="outlined"
        color="primary"
      />

      <div style={{ height: "20px" }}></div>

      <TextInput
        id={`outlined`}
        name={"Senha"}
        value={password}
        onChange={inputPassword}
        label={"Senha"}
        variant="outlined"
        color="primary"
        type={true ? "password" : "text"}
      />
      <div style={{ height: 40, width: 1 }}></div>
      <ButtonRegister
        onClick={() => postData()}
        disabled={error.error}
        variant="contained"
        color="primary"
      >
        Registrar
      </ButtonRegister>
      <div style={{ height: 40, width: 1 }}></div>
    </Body>
  );
}
