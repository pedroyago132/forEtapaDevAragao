import * as React from "react";
import { useContext } from "react";
import { AppContext } from "../../state";
import { AlertColor, Typography } from "@mui/material";

import {
  Body,
  TextInput,
  StyledInputDataArea,
  StyledListArea,
  StyledAreaEmployee,
  StyledAreaItemList,
  StyledAreaInfo,
  StyledAreaEmployee2,
  StyledAreaModal,
  StyledAreaModal2,
  Container,
  StyledContainerList,
  Logo,
  ContainerSendList,
  styleImage,
  StyledImageDocument,
  BoxSendList,
  BackgroundOverlay,
  Cancel,
  style,
} from "./style";
import { v4 } from "uuid";
import Accordion from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
import { IEmployee, IEmployeeData } from "../../interfaces";
import LogoDark from "../../assets/images/logo_light.png";
import ImageDocument from "../../assets/images/document.jpg";
import ListClientEmployee from "../../components/ListClient";
import { createEmployee, getEmployees, getUserByEmail } from "./method";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CancelIcon from "../../assets/images/cancel.png";

export default function SendList() {
  const { state, dispatch } = useContext(AppContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openImage, setOpenImage] = React.useState(false);
  const handleOpenImage = () => setOpenImage(true);
  const handleCloseImage = () => setOpenImage(false);

  const [empresa, setEmpresa] = React.useState("");
  const [cep, setCep] = React.useState("");
  const [nome, setNome] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [rg, setRg] = React.useState("");
  const [tituloEleitor, setTituloEleitor] = React.useState("");
  const [birthdate, setBirthdate] = React.useState("");
  const [motherName, setMotherName] = React.useState("");
  const [fatherName, setFatherName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [car, setCar] = React.useState("");
  const [user, setUser] = React.useState({});
  const [placa, setPlaca] = React.useState("");
  const [renevan, setRenevan] = React.useState(0);
  const [cnpjUser, setCNPJUser] = React.useState(0);
  const [orgao, setOrgao] = React.useState("");
  const [group, setGroup] = React.useState("");
  const [dataEmployeeArr, setDataEmployeeArr] = React.useState<IEmployee[]>([]);
  const [condition, setCondition] = React.useState("");
  const [document, setDocument] = React.useState("");
  const [conditionNumber, setConditionNumber] = React.useState(0);
  const [date, setDate] = React.useState("");
  const [snackbarState, setSnackbarState] = React.useState({
    isOpen: false,
    vertical: "top",
    horizontal: "right",
    severity: "success",
    message: "",
  });
  const { vertical, horizontal, isOpen, severity, message } = snackbarState;
  const [listEmployee, setListEmployee] = React.useState<IEmployee[]>([]);

  const postData = async () => {
    // Aguarda o setDate antes de continuar
    await new Promise((resolve) => setTimeout(resolve, 500));

    for (const obj of dataEmployeeArr) {
      try {
        await createEmployee(obj).then(() => sucessSendList());
      } catch (error) {
        openSnackbar("error", "Falha ao enviar lista");
      }
    }
  };

  const handleItemClick = (index: number) => {
    const selectedItem = dataEmployeeArr[index]; // Obtém o item clicado

    // Define os estados com os valores do item clicado
    setNome(selectedItem.name);
    setCpf(selectedItem.cpf);
    setRg(selectedItem.rg);
    setTituloEleitor(selectedItem.tituloEleitor ?? "");
    setBirthdate(selectedItem.birthdate);
    setMotherName(selectedItem.mother);
    setFatherName(selectedItem.father);
    setAddress(selectedItem.neighborhood);
    setCar(selectedItem.modelo ?? "");
    setUser(selectedItem); // Se desejar definir o estado 'user' com o objeto completo
    setPlaca(selectedItem.placa ?? "");
    setRenevan(selectedItem.renevan ?? 0);
    setGroup(selectedItem.group);
  };

  const adicionarIEmployeeDatas = (): void => {
    // Verifica se algum dos valores está vazio
    if (cpf == "" || null) {
      openSnackbar("error", "Preencha o campo CPF");
      return;
    } else if (rg == "" || null) {
      openSnackbar("error", "Preencha o campo RG");
      return;
    } else if (birthdate == "" || null) {
      openSnackbar("error", "Preencha o campo Data de Nascimento");
      return;
    } else if (condition == "" || null) {
      openSnackbar("error", "Selecione um Prazo");
      return; // A função não prosseguirá se o campo "Condition" estiver vazio
    }

    setNome("");
    setCpf("");
    setRg("");
    setTituloEleitor("");
    setBirthdate("");
    setMotherName("");
    setFatherName("");
    setAddress("");
    setCar("");
    setUser(""); // Se desejar definir o estado 'user' com o objeto completo
    setPlaca("");
    setRenevan(0);
    setGroup("");

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const calculatedDay = day + condition;
    const dateSend = `${day}/${month}/${year}`;
    const transformStringToNumber = parseInt(condition, 10);
    setConditionNumber(transformStringToNumber);
    let newEmployeeArr = dataEmployeeArr;
    const newEmployee: IEmployee = {
      name: nome,
      email: undefined,
      rg: rg,
      cpf: cpf,
      father: fatherName,
      mother: motherName,
      street: "aaa",
      neighborhood: address,
      addressNumber: 0,
      complement: "aaa",
      cep: 0,
      city: "",
      company: cnpjUser,
      uf: dateSend,
      placa: placa,
      modelo: car,
      group: group,
      cor: "aa",
      renevan: renevan,
      status: "",
      condition: conditionNumber,
      image: undefined,
      birthdate: birthdate,
      data: "",
      indexEmployee: 0,
    };
    setDataEmployeeArr((prevData) => [...prevData, newEmployee]);
  };

  const excluirIEmployeeData = (index: number) => {
    const novosIEmployeeDatas = [...dataEmployeeArr];
    novosIEmployeeDatas.splice(index, 1);
    setDataEmployeeArr(novosIEmployeeDatas);
  };

  const openModalClient = () => {
    let id = v4();
    handleOpen();
    setGroup(id);
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

  const handleEditEmployee = () => { };

  const sucessSendList = () => {
    openSnackbar("success", "Lista enviada");
    setOpen(false);
   // fetchData();
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    const insertDate = dataEmployeeArr.map((objeto) => ({
      ...objeto,
      uf: date,
      condition: conditionNumber,
    }));
    setDataEmployeeArr(insertDate);
    setCondition(event.target.value as string);
  };

  const handleChangeSelectDocument = (event: SelectChangeEvent) => {
    setDocument(event.target.value as string);
  };

  const inputCompanya = (event: any) => {
    const valorInput = event.target.value;

    // Use uma expressão regular para verificar se o valor é um número inteiro
    if (/^\d*$/.test(valorInput)) {
      setEmpresa(valorInput);
    }
  };
/*
  const fetchData = async () => {
    try {
      const response = await getEmployees();
      console.log(response, 'response employees')
      setListEmployee(response);
    } catch (error) {
      console.error("Erro ao buscar funcionários", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []); */

  /*

  React.useEffect(() => {
    const userData = localStorage.getItem("user");

    const data = localStorage.getItem("user");

    if (data) {
      const user = JSON.parse(data);
      console.log(user);
    }

    if (userData) {
      const userObject = JSON.parse(userData);

      getUserByEmail(userObject.email).then((res) => {
        setUser(res);
        setCNPJUser(res.cnpj);
        console.log(userObject);
      });
    }
  }, []); */

  const formatRG = (rg: string) => {
    const numericRG = rg.replace(/\D/g, "");

    if (numericRG.length <= 2) {
      return numericRG;
    } else if (numericRG.length <= 5) {
      return `${numericRG.slice(0, 2)}.${numericRG.slice(2)}`;
    } else if (numericRG.length <= 8) {
      return `${numericRG.slice(0, 2)}.${numericRG.slice(2, 5)}.${numericRG.slice(5)}`;
    } else {
      return `${numericRG.slice(0, 2)}.${numericRG.slice(2, 5)}.${numericRG.slice(5, 8)}-${numericRG.slice(8)}`;
    }
  };

  const formatCNPJ = (cnpj: string) => {
    // Remove todos os caracteres não numéricos do CNPJ
    const numericCNPJ = cnpj.replace(/\D/g, "");

    // Aplica a formatação com guias
    if (numericCNPJ.length <= 2) {
      return numericCNPJ;
    } else if (numericCNPJ.length <= 5) {
      return `${numericCNPJ.slice(0, 2)}.${numericCNPJ.slice(2)}`;
    } else if (numericCNPJ.length <= 8) {
      return `${numericCNPJ.slice(0, 2)}.${numericCNPJ.slice(
        2,
        5
      )}.${numericCNPJ.slice(5)}`;
    } else if (numericCNPJ.length <= 12) {
      return `${numericCNPJ.slice(0, 2)}.${numericCNPJ.slice(
        2,
        5
      )}.${numericCNPJ.slice(5, 8)}/${numericCNPJ.slice(8)}`;
    } else {
      return `${numericCNPJ.slice(0, 2)}.${numericCNPJ.slice(
        2,
        5
      )}.${numericCNPJ.slice(5, 8)}/${numericCNPJ.slice(
        8,
        12
      )}-${numericCNPJ.slice(12)}`;
    }
  };

  const formatDate = (date: string) => {
    const numericDate = date.replace(/\D/g, "");

    if (numericDate.length <= 2) {
      return numericDate;
    } else if (numericDate.length <= 4) {
      return `${numericDate.slice(0, 2)}/${numericDate.slice(2)}`;
    } else {
      return `${numericDate.slice(0, 2)}/${numericDate.slice(
        2,
        4
      )}/${numericDate.slice(4, 8)}`;
    }
  };

  const closeSnackbar = () => {
    setSnackbarState({ ...snackbarState, isOpen: false });
  };

  const formatCPF = (cpf: string) => {
    // Remove todos os caracteres não numéricos do CPF
    const numericCPF = cpf.replace(/\D/g, "");

    // Aplica a formatação com guias
    if (numericCPF.length <= 3) {
      return numericCPF;
    } else if (numericCPF.length <= 6) {
      return `${numericCPF.slice(0, 3)}.${numericCPF.slice(3)}`;
    } else if (numericCPF.length <= 9) {
      return `${numericCPF.slice(0, 3)}.${numericCPF.slice(
        3,
        6
      )}.${numericCPF.slice(6)}`;
    } else {
      return `${numericCPF.slice(0, 3)}.${numericCPF.slice(
        3,
        6
      )}.${numericCPF.slice(6, 9)}-${numericCPF.slice(9, 11)}`;
    }
  };

  const formatTituloEleitor = (titulo: string) => {
    // Remove todos os caracteres não numéricos do título de eleitor
    const numericTitulo = titulo.replace(/\D/g, "");

    // Aplica a formatação com guias
    if (numericTitulo.length <= 4) {
      return numericTitulo;
    } else if (numericTitulo.length <= 8) {
      return `${numericTitulo.slice(0, 4)}.${numericTitulo.slice(4)}`;
    } else if (numericTitulo.length <= 12) {
      return `${numericTitulo.slice(0, 4)}.${numericTitulo.slice(
        4,
        8
      )}.${numericTitulo.slice(8)}`;
    } else {
      return `${numericTitulo.slice(0, 4)}.${numericTitulo.slice(
        4,
        8
      )}.${numericTitulo.slice(8, 12)}-${numericTitulo.slice(12)}`;
    }
  };

  const formatCEP = (cep: string) => {
    // Remove todos os caracteres não numéricos do CEP
    const numericCEP = cep.replace(/\D/g, "");

    // Aplica a formatação com guias
    if (numericCEP.length <= 5) {
      return numericCEP;
    } else {
      return `${numericCEP.slice(0, 5)}-${numericCEP.slice(5)}`;
    }
  };

  const inputTituloEleitor = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedTitulo = formatTituloEleitor(event.target.value);
    setTituloEleitor(formattedTitulo);
  };

  const inputCNPJ = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCNPJ = formatCNPJ(event.target.value);
    setEmpresa(formattedCNPJ);
  };

  const inputName = (event: any) => {
    setNome(event.target.value);
  };

  const inputCEP = (event: any) => {
    const formattedCEP = formatCEP(event.target.value);
    setCep(formattedCEP);
  };

  const inputOrgao = (event: any) => {
    setOrgao(event.target.value);
  };

  const inputCPF = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCPF = formatCPF(event.target.value);
    setCpf(formattedCPF);
  };

  const inputRg = (event: any) => {
    const formattedRG = formatRG(event.target.value);
    setRg(formattedRG);
  };

  const inputBirthdate = (event: any) => {
    const formattedBirthdate = formatDate(event.target.value);
    setBirthdate(formattedBirthdate);
  };

  const inputMotherName = (event: any) => {
    setMotherName(event.target.value);
  };

  const inputFatherName = (event: any) => {
    setFatherName(event.target.value);
  };

  const inputAdress = (event: any) => {
    setAddress(event.target.value);
  };

  const inputCar = (event: any) => {
    setCar(event.target.value);
  };

  const inputPlaca = (event: any) => {
    setPlaca(event.target.value);
  };

  const inputRenevan = (event: any) => {
    const valorInput = event.target.value;

    // Use uma expressão regular para verificar se o valor é um número inteiro
    if (/^\d*$/.test(valorInput)) {
      setRenevan(valorInput);
    }
  };

  return (
    <Body>
      <BackgroundOverlay />
      <StyledInputDataArea>
        <Button onClick={() => openModalClient()} variant="contained">
          CRIAR LISTA
        </Button>
      </StyledInputDataArea>
      <Typography
        fontSize={16}
        fontWeight={600}
        alignSelf={"center"}
        color={"black"}
      >
        LISTAS ENVIADAS
      </Typography>
      <StyledListArea>
        {/*
    //@pedro components do client     
  */}

        <ListClientEmployee
          employeeList={listEmployee}
          handleOpenImage={handleOpenImage}
          user={user}
        />
        {/*
    //@pedro components do client     
  */}
      </StyledListArea>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <StyledAreaModal>
            <TextInput
              id={`outlined`}
              name={"Nome"}
              value={nome}
              onChange={inputName}
              label={"Nome"} // Use translation, if available
              variant="outlined"
              color="primary"
            />
            <div style={{ height: "35px" }}></div>
            <TextInput
              id={`outlined`}
              name={"Birthdate"}
              value={birthdate}
              onChange={inputBirthdate}
              label={"Data de Nascimento"} // Use translation, if available
              variant="outlined"
              color="primary"
            />
            <div style={{ height: "35px" }}></div>
            <TextInput
              id={`outlined`}
              name={"CPF"}
              value={cpf}
              onChange={inputCPF}
              label={"CPF"} // Use translation, if available
              variant="outlined"
              color="primary"
            />
            <div style={{ height: "35px" }}></div>

            <TextInput
              id={`outlined`}
              name={"Orgão expedidor"}
              value={orgao}
              onChange={inputOrgao}
              label={"Orgão Expedidor"} // Use translation, if available
              variant="outlined"
              color="primary"
            />
            <div style={{ height: "35px" }}></div>
            <TextInput
              id="outlined"
              name="RG"
              value={rg}
              onChange={inputRg}
              label="RG"
              variant="outlined"
              color="primary"
            />
            <div style={{ height: "35px" }}></div>

            <TextInput
              id={`outlined`}
              name={"MotherName"}
              value={motherName}
              onChange={inputMotherName}
              label={"Nome da Mãe"} // Use translation, if available
              variant="outlined"
              color="primary"
            />
            <div style={{ height: "35px" }}></div>

            <TextInput
              id={`outlined`}
              name={"FatherName"}
              value={fatherName}
              onChange={inputFatherName}
              label={"Nome do Pai"} // Use translation, if available
              variant="outlined"
              color="primary"
            />
            <div style={{ height: "35px" }}></div>


            <div style={{ width: '100%', display: 'flex' }} >
              <TextInput
                id={`outlined`}
                name={"Adress"}
                value={address}
                onChange={inputAdress}
                label={"Endereço"} // Use translation, if available
                variant="outlined"
                color="primary"
                style={{ width: '50%' }}
              />

              <TextInput
                id={`outlined`}
                name={"CEP"}
                value={cep}
                onChange={inputCEP}
                label={"CEP"} // Use translation, if available
                variant="outlined"
                color="primary"
                style={{ width: '50%' }}
              />
              <div style={{ height: "55px" }}></div>
            </div>

            <TextInput
              id={`outlined`}
              name={"Car"}
              value={car}
              onChange={inputCar}
              label={"Veículo"} // Use translation, if available
              variant="outlined"
              color="primary"
            />
            <div style={{ height: "35px" }}></div>

            <TextInput
              id={`outlined`}
              name={"Placa"}
              value={placa}
              onChange={inputPlaca}
              label={"Placa"} // Use translation, if available
              variant="outlined"
              color="primary"
            />
            <div style={{ height: "35px" }}></div>

            <TextInput
              id={`outlined`}
              name={"Renevan"}
              value={renevan}
              onChange={inputRenevan}
              label={"Renavan"} // Use translation, if available
              variant="outlined"
              color="primary"
            />
            <div style={{ height: "35px" }}></div>
          </StyledAreaModal>
          <StyledAreaModal2>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Prazo de entrega
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={condition}
                label="Condição"
                onChange={handleChangeSelect}
              >
                <MenuItem value={1}>24 horas</MenuItem>
                <MenuItem value={2}>48 horas</MenuItem>
                <MenuItem value={5}>Até 5 dias úteis</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Documento Combrobatório
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={document}
                label="Condição"
                onChange={handleChangeSelectDocument}
              >
                <MenuItem value={1}>Sim</MenuItem>
                <MenuItem value={2}>Não</MenuItem>
              </Select>
            </FormControl>
            <Button
              onClick={() => adicionarIEmployeeDatas()}
              color="success"
              variant="contained"
            >
              Adicionar
            </Button>
          </StyledAreaModal2>
          <StyledAreaModal>
            <StyledContainerList>
              {dataEmployeeArr.map((item, index) => {
                return (
                  <Accordion style={{ backgroundColor: "white", width: "95%" }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <StyledAreaItemList style={{ width: "33%" }}>
                        <Typography variant="body1">Nome:</Typography>

                        <Typography variant="body2">{item.name}</Typography>
                      </StyledAreaItemList>
                    </AccordionSummary>
                    <AccordionDetails
                      style={{ minHeight: 100, flexDirection: "column" }}
                    >
                      <StyledAreaEmployee style={{ width: "100%" }}>
                        <StyledAreaInfo>
                          <Typography variant="body1">Nome Da Mãe:</Typography>

                          <Typography variant="body2">{item.mother}</Typography>
                        </StyledAreaInfo>

                        <StyledAreaInfo>
                          <Typography variant="body1">CPF:</Typography>

                          <Typography variant="body2">{item.cpf}</Typography>
                        </StyledAreaInfo>

                        <StyledAreaInfo>
                          <Typography variant="body1">Empresa:</Typography>

                          <Typography variant="body2">
                            {item.company}
                          </Typography>
                        </StyledAreaInfo>

                        <StyledAreaInfo>
                          <Typography variant="body1">Nome do Pai:</Typography>

                          <Typography variant="body2">{item.father}</Typography>
                        </StyledAreaInfo>

                        <StyledAreaInfo>
                          <Typography variant="body1">Rg:</Typography>

                          <Typography variant="body2">{item.rg}</Typography>
                        </StyledAreaInfo>

                        <StyledAreaInfo>
                          <Typography variant="body1">
                            Data de Nascimento:
                          </Typography>

                          <Typography variant="body2">
                            {item.birthdate}
                          </Typography>
                        </StyledAreaInfo>

                        <StyledAreaInfo>
                          <Typography variant="body1">Carro:</Typography>

                          <Typography variant="body2">{item.modelo}</Typography>
                        </StyledAreaInfo>

                        <StyledAreaInfo>
                          <Typography variant="body1">Placa:</Typography>

                          <Typography variant="body2">{item.placa}</Typography>
                        </StyledAreaInfo>

                        <StyledAreaInfo>
                          <Typography variant="body1">Endereço:</Typography>

                          <Typography variant="body2">
                            {item.neighborhood}
                          </Typography>
                        </StyledAreaInfo>
                      </StyledAreaEmployee>

                      <StyledAreaEmployee2 style={{ width: "100%" }}>
                        <Button
                          onClick={() => excluirIEmployeeData(index)}
                          style={{ marginTop: 15 }}
                          variant="contained"
                        >
                          Excluir
                        </Button>

                        <Button
                          onClick={() => handleItemClick(index)}
                          style={{ marginTop: 15 }}
                          variant="contained"
                        >
                          Editar
                        </Button>
                      </StyledAreaEmployee2>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </StyledContainerList>
          </StyledAreaModal>

          <StyledAreaModal2>
            <Cancel onClick={() => handleClose()} src={CancelIcon} />
            <Logo src={LogoDark} />

            <Typography fontSize={14} fontWeight={600} color={"black"}>
              Funcionários:{dataEmployeeArr.length}
            </Typography>

            <Button onClick={() => postData()} variant="contained">
              Enviar Lista
            </Button>
          </StyledAreaModal2>
        </Box>
      </Modal>

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

      <Modal
        open={openImage}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleImage}>
          <StyledImageDocument src={ImageDocument} alt="Imagem do documento" />
        </Box>
      </Modal>
    </Body>
  );
}
