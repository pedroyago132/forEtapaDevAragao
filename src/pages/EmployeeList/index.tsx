
import * as React from "react";
import { useContext, useRef } from "react";

import Typography from "@mui/material/Typography";
import { AppContext } from "../../state";
import {
  Body,
  StyledTable,
  StyledContainerCliente,
  StyledAreaCod,
  StyledAreaModal,
  StyledAreaItemList,
  ContainerListClient,
  StyledItemList,
  StyledAreaAccordion,
  StyledAreaInfoItem,
  StyledItemInfo,
  StyledAreaInfoItem2,
  StyledImage,
  Details,
  StyledAreaDelete,
  BackgroundOverlay
} from "./style";
import { IClient, IEmployee, IUser } from "../../interfaces";
import { deleteUser, getEmployees, getUserByEmail, getUsers, uploadEmployeeFile } from "./methods";
import LogoLight from "../../assets/images/logo_light.png";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Snackbar, Alert, AlertColor, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import EmployeeItemList from "../../components/EmployeeItem";


interface GroupCondition {
  condition: string; 
}

export default function ListEmployee() {
  const { state, dispatch } = useContext(AppContext);
  const [openImage, setOpenImage] = React.useState(false);
  const handleOpenImage = () => setOpenImage(true);
  const fileInputRef = useRef<HTMLInputElement>(null); // Specify the type here
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [renderDelete, setRenderDelete] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose = () => setOpen(false);
  console.log(state)
  const [images, setImages] = React.useState(["dsajoid", "djsadjoisa"]);
  const [employee, setEmployee] = React.useState<IEmployee[]>([]);
  const [clients, setClients] = React.useState<IClient[]>([]);
  const [dataUser, setDataUser] = React.useState();
  const [ clientData, setClientData ] = React.useState({
    razaoSocial: '',
    nomeFantasia: '',
    cnpj: 0,
    address: '',
    phone: 0,
    nome: '',
    email: '',
  });
  const [ dadosFuncionarios, setDataFuncioanrios ] = React.useState([{
    data: 'ds',
    name: 'João Silva',
    email: 'joao.silva@example.com',
    rg: '123456789',
    cpf: '123.456.789-00',
    father: 'José Silva',
    mother: 'Maria Silva',
    street: 'Rua das Flores',
    neighborhood: 'Centro',
    addressNumber: 123,
    complement: 'Apt 45',
    cep: 12345678,
    city: 'São Paulo',
    company: 1,
    uf: 'SP',
    placa: 'ABC-1234',
    modelo: 'Fiat Uno',
    group: 'Administrativo',
    cor: 'Preto',
    renevan: 987654321,
    status: 'Ativo',
    condition: 1,
    birthdate: '1990-01-01',
    image: ['image1.jpg', 'image2.jpg'],
    indexEmployee: 5,
    tituloEleitor: '1234-5678-9012'
  },
  {
    data: 'ds',
    name: 'João Silva',
    email: 'joao.silva@example.com',
    rg: '123456789',
    cpf: '123.456.789-00',
    father: 'José Silva',
    mother: 'Maria Silva',
    street: 'Rua das Flores',
    neighborhood: 'Centro',
    addressNumber: 123,
    complement: 'Apt 45',
    cep: 12345678,
    city: 'São Paulo',
    company: 1,
    uf: 'SP',
    placa: 'ABC-1234',
    modelo: 'Fiat Uno',
    group: 'Administrativo',
    cor: 'Preto',
    renevan: 987654321,
    status: 'Ativo',
    condition: 1,
    birthdate: '1990-01-01',
    image: ['image1.jpg', 'image2.jpg'],
    indexEmployee: 5,
    tituloEleitor: '1234-5678-9012'
  }
]);

  const [selectedFile, setSelectedFile] = React.useState<File | null>(null); // Specify the type here
  const [snackbarState, setSnackbarState] = React.useState({
    isOpen: false,
    vertical: "top",
    horizontal: "right",
    severity: "success",
    message: "",
  });

  const { vertical, horizontal, isOpen, severity, message } = snackbarState;

  const openSnackbar = (severity: string, message: string) => {
    setSnackbarState({
      isOpen: true,
      severity: severity,
      message: message,
      vertical: "top",
      horizontal: "right",
    });
  };

  const closeSnackbar = () => {
    setSnackbarState({ ...snackbarState, isOpen: false });
  };



  const groupedEmployees: { [key: string]: IEmployee[] } = {};

  dadosFuncionarios.forEach((employee) => {
    // Check if the employee's cnpj matches the clientData's cnpj
    if (employee.company === clientData.cnpj) {
      // If the group doesn't exist yet, create it
      if (!groupedEmployees[employee.group]) {
        groupedEmployees[employee.group] = [];
      }
      // Add the employee to the group
      groupedEmployees[employee.group].push(employee);
    }
  });
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    height: '80%',
    bgcolor: '#FAD057',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexWrap: 'wrap', // Adicione flex-wrap aqui
  };


  const handleOpen = (item:any) => {
    setOpen(true);
    setClientData(item)
  }

/*
  React.useEffect(() => {
    getEmployees().then((res) => {
      setEmployee(res)
      console.log(res,'aaaaa')
    })

    getUsers().then((res) => {
      // Filtra os itens que têm a propriedade cnpj definida
      const clientsWithCnpjAndNotAdmin = res.filter(item => item.cnpj !== undefined && item.role !== "Admin");


      setClients(clientsWithCnpjAndNotAdmin);
    });

    const data = localStorage.getItem('user');
    if (data) {
      const user = JSON.parse(data);
      setDataUser(user);
      console.log(user)
    }

   

  }, []); */

  const formatPhoneNumber = (phoneNumber: number) => {
    const phoneString = phoneNumber.toString()
    const numericPhoneNumber = phoneString.replace(/\D/g, "");

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

  const formatCNPJ = (cnpj: number) => {
    const cnpjString = cnpj.toString()
    // Remove todos os caracteres não numéricos do CNPJ
    const numericCNPJ = cnpjString.replace(/\D/g, "");
  
    // Aplica a formatação com guias
    if (numericCNPJ.length <= 2) {
      return numericCNPJ;
    } else if (numericCNPJ.length <= 5) {
      return `${numericCNPJ.slice(0, 2)}.${numericCNPJ.slice(2)}`;
    } else if (numericCNPJ.length <= 8) {
      return `${numericCNPJ.slice(0, 2)}.${numericCNPJ.slice(2, 5)}.${numericCNPJ.slice(5)}`;
    } else if (numericCNPJ.length <= 12) {
      return `${numericCNPJ.slice(0, 2)}.${numericCNPJ.slice(2, 5)}.${numericCNPJ.slice(5, 8)}/${numericCNPJ.slice(8)}`;
    } else {
      return `${numericCNPJ.slice(0, 2)}.${numericCNPJ.slice(2, 5)}.${numericCNPJ.slice(5, 8)}/${numericCNPJ.slice(8, 12)}-${numericCNPJ.slice(12)}`;
    }
  };

  const sucessDelete = () => {
    openSnackbar('success','Deletado com sucesso')
    handleClose()
  }


  const deleteClient = async (email:string) => {
    try {
      const response = await deleteUser(email).then(() => sucessDelete()).catch(error => console.log(error))
      console.log("suceess", response);
    } catch (error) {
      openSnackbar('error','Falha ao enviar link, verifique a internet')
    }
  };

    return (
      <Body>
        <Typography marginTop={5} fontSize={26}>
          CLIENTES
        </Typography>
  
     <ContainerListClient>
     {
  clients.map(item => (
    // Adicionando uma verificação para item.company !== undefined
    item.cnpj && (
      <StyledContainerCliente style={{ marginTop: 5 }} onClick={() => handleOpen(item)}>
        <StyledAreaCod>
          <Typography fontSize={12} fontWeight={600} color={"white"}>
            Código
          </Typography>

          <Typography fontSize={10} fontWeight={400}>
            {String(item.cnpj).slice(0, 6)}
          </Typography>
        </StyledAreaCod>

        <StyledAreaCod>
          <Typography fontSize={12} fontWeight={600} color={"white"}>
            Nome Empresa
          </Typography>

          <Typography fontSize={10} fontWeight={400}>
            {item.razaoSocial}
          </Typography>
        </StyledAreaCod>

        <StyledAreaCod></StyledAreaCod>
      </StyledContainerCliente>
    ) 
  ))
}
    </ContainerListClient>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <StyledAreaModal>
              <StyledImage src={LogoLight} />
              <StyledItemInfo style={{ marginTop: 20 }}>
                <StyledAreaInfoItem>
                  <Typography fontSize={14} fontWeight={600} color={"black"}>
                    Razão Social:
                  </Typography>
                </StyledAreaInfoItem>
  
                <StyledAreaInfoItem2>
                  <Typography fontSize={14} fontWeight={400} color={"grey"}>
                    {clientData.razaoSocial}
                  </Typography>
                </StyledAreaInfoItem2>
              </StyledItemInfo>
  
              <StyledItemInfo>
                <StyledAreaInfoItem>
                  <Typography fontSize={14} fontWeight={600} color={"black"}>
                    Nome Fantasia:
                  </Typography>
                </StyledAreaInfoItem>
  
                <StyledAreaInfoItem2>
                  <Typography fontSize={14} fontWeight={400} color={"grey"}>
                    {clientData.nomeFantasia}
                  </Typography>
                </StyledAreaInfoItem2>
              </StyledItemInfo>
  
              <StyledItemInfo>
                <StyledAreaInfoItem>
                  <Typography fontSize={14} fontWeight={600} color={"black"}>
                    CNPJ:
                  </Typography>
                </StyledAreaInfoItem>
  
                <StyledAreaInfoItem2>
                  <Typography fontSize={14} fontWeight={400} color={"grey"}>
                    {formatCNPJ(clientData.cnpj)}
                  </Typography>
                </StyledAreaInfoItem2>
              </StyledItemInfo>
  
              <StyledItemInfo>
                <StyledAreaInfoItem>
                  <Typography fontSize={14} fontWeight={600} color={"black"}>
                    Endereço:
                  </Typography>
                </StyledAreaInfoItem>
  
                <StyledAreaInfoItem2>
                  <Typography fontSize={14} fontWeight={400} color={"grey"}>
                    {clientData.address}
                  </Typography>
                </StyledAreaInfoItem2>
              </StyledItemInfo>
  
              <StyledItemInfo>
                <StyledAreaInfoItem>
                  <Typography fontSize={14} fontWeight={600} color={"black"}>
                    Telefone:
                  </Typography>
                </StyledAreaInfoItem>
  
                <StyledAreaInfoItem2>
                  <Typography fontSize={14} fontWeight={400} color={"grey"}>
                    {formatPhoneNumber(clientData.phone)}
                  </Typography>
                </StyledAreaInfoItem2>
              </StyledItemInfo>
  
              <StyledItemInfo>
                <StyledAreaInfoItem>
                  <Typography fontSize={14} fontWeight={600} color={"black"}>
                    Email :
                  </Typography>
                </StyledAreaInfoItem>
  
                <StyledAreaInfoItem2>
                  <Typography fontSize={14} fontWeight={400} color={"grey"}>
                    {clientData.email}
                  </Typography>
                </StyledAreaInfoItem2>
              </StyledItemInfo>

              <Button onClick={() => setRenderDelete(true)} variant="contained"  style={{ marginTop: 20,width:'40%' }}>
              Deletar
            </Button>

            {
            renderDelete && (
              <>
              <Typography fontSize={14} marginTop={2} fontWeight={400} color={"grey"}>
              Você tem certeza?
            </Typography>
          <StyledAreaDelete>
               <label onClick={() => deleteClient(clientData.email)} style={{cursor:'pointer',fontSize:14,fontWeight:'600',color:'black'}} >
                    Sim
                  </label>

                  <label onClick={() => setRenderDelete(false)}  style={{cursor:'pointer',fontSize:14,fontWeight:'600',color:'black'}}>
                    Não
                  </label>
          </StyledAreaDelete>
          </>
            )
            }
  
            </StyledAreaModal>
  
            <StyledAreaModal>
              <Typography
                fontSize={19}
                fontWeight={600}
                color={"white"}
                alignSelf={"center"}
                margin={2}
              >
                Listas Enviadas
              </Typography>

              {Object.keys(groupedEmployees).map((group, index) => (
               
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel-${index}-content`} id={`panel-${index}-header`}>
          <StyledAreaAccordion>
          <Typography  fontSize={12} >
                  Lista: {group.slice(0, 10)} 
                </Typography>
              </StyledAreaAccordion>
              <StyledAreaAccordion>
                <Typography  fontSize={12} >
                   Data de envio::{" "}
                  {groupedEmployees[group][0].uf}
                </Typography>
              </StyledAreaAccordion>

              <StyledAreaAccordion>
          <Typography  fontSize={12} >
                  Condição: 
                </Typography>
              </StyledAreaAccordion>
          </AccordionSummary>
          <AccordionDetails>
            {groupedEmployees[group].map((employee, employeeIndex) => (
              <>
             <Accordion style={{ backgroundColor: "white" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
               
               <StyledAreaItemList>
               <Typography
                 fontSize={14}
                 fontWeight={600}
                 color={"black"}
               >
                 Nome:
               </Typography>
           
               <Typography fontSize={14} fontWeight={400} color={"grey"}>
              {employee.name}
               </Typography>
             </StyledAreaItemList>
             
           

                </AccordionSummary>
                <Details>
                
                <EmployeeItemList group={group} employeeIndex={employeeIndex} groupedEmployees={groupedEmployees} handleOpenImage={handleOpenImage} client={false} openSnackbar={openSnackbar} employee={employee}  />
              
                </Details>
                </Accordion>

            
             </>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
   
          
            
  
              <StyledItemList onClick={() => handleOpen2()}></StyledItemList>
            </StyledAreaModal>
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
      </Body>
    );
  
}



