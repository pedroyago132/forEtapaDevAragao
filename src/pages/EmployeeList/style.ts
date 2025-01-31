import { Button, List, Table, TableContainer } from "@mui/material";
import styled from "styled-components";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from "@mui/material/Accordion";
import MainImage from "../../assets/images/background.png";

export const ImageCheck = styled.img`
    width: 40px;
    height:40px;
    margin-top:30px;
`

export const ContainerDetails = styled(AccordionDetails)`
min-height:80px;
display:flex;
flex-direction:column;
`

export const AreaDetailsCheck = styled.div`
    width: 100%;
    display:flex;
    align-items:center;
    justify-content:center;
    gap:20px;
`

export const AreaDetailsWrong = styled.div`
    width: 100%;
    display:flex;
    margin-top:30px;
    align-items:center;
    justify-content:center;
`

export const ContainerEmployee = styled(Accordion)`
margin-top:25px;
`

export const AreaDetailsWrong1 = styled.div`
    width: 50%;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
`

export const Body = styled.div`
    width: 100%;
    min-height: 100vh;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
`

export const TextBold = styled.label`
    font-weight:600;
    font-size:16px;
    color:black;
`

export const Text = styled.label`
    font-size:13px;
    color:black;
`

export const AreaCompany = styled.div`
  width:42%;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
`

export const FileInput = styled.input`
  display: none;
`

export const StyledTable = styled(Table)`
    width: 80vw;
`

export const StyledContainerCliente = styled.div`
width:70vw;
height:50px;
border-radius:25px;
display:flex;
background-color:#CDCDCD;
cursor:pointer;
margin-left:8%;

@media (max-width:  1000px) {
   margin-left:16%;
  }
`

export const StyledAreaCod = styled.div`
width:33%;
height:100%;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
`

export const BackgroundOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${MainImage});
    background-size: cover;
    background-position: center;
    opacity: 0.3;
    background-size:70%;
    background-position: calc(50% + 100px) center;
    background-repeat: no-repeat;
    /* Centralize o overlay usando flexbox */
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const StyledAreaModal = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;

  @media (max-width:  1000px) {
    width: 100%;
    height:40%;
  }
`;


export const StyledAreaList = styled.div`
width:95%;
height:80%;
background-color:white;
border-radius:25px
`

export const StyledItemList = styled.div`
width:100%;
border-bottom:1px solid grey;
display:flex;
height:40px;
cursor:pointer;
`

export const StyledAreaItemList = styled.div`
width:100%;
display:flex;
align-items:center;
justify-content:flex-start;
`

export const StyledAreaEmployee = styled.div`
width:70%;
height:100%;
display:flex;
align-items:center;
justify-content:center;
flex-wrap:wrap;
border-right:1px solid grey
`

export const StyledAreaEmployee2 = styled.div`
width:30%;
height:100%;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
`

export const StyledAreaInfo = styled.div`
width:40%;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
margin:3px;

`

export const StyledItemInfo = styled.div`
width:80%;
display:flex;
border-bottom:1px solid black;
background-color:white;
margin:5px;
height:40px;
`

export const StyledAreaInfoItem = styled.div`
width:40%;
display:flex;
align-items:center;
justify-content:center;
`

export const StyledAreaInfoItem2 = styled.div`
width:60%;
display:flex;
align-items:center;
justify-content:center;
`
export const StyledImage = styled.img`
width:40%;
align-self:center;
margin-left:-18%;
`
export const StyledAreaAccordion = styled.div`
width:30%;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
margin:3px;
`

export const ContainerListClient = styled.div`
width:100%;
height:80%;
display:display;
align-items:center;
justify-content:center;
flex-direction:column;
margin:3px;
overflow-y:auto;
`

export const Details = styled(AccordionDetails)`
min-height:100px;
display:flex;
flex-direction:row;
@media (max-width:  1000px) {
    flex-direction:column
  }
`
export const StyledAreaDelete = styled.div`
width:20%;
margin-top:30px;
display:flex;
gap:10px;
`