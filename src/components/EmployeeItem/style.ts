import { List, Modal } from "@mui/material";
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MainImage from "../../assets/images/99a04846-7fde-4cd1-ad20-f2bd40b29394.jpeg";



export const StyledAreaInfo = styled.div`
width:40%;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
margin:3px;
`

export const StyledAreaModal = styled.div`
width:35%;
min-height:100%;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
overflow-y: scroll;
`

export const StyledAreaModal2 = styled.div`
width:15%;
height:100%;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
gap:35px;
`

export const StyledAreaItemList = styled.div`
width:25%;
display:flex;
align-items:center;
justify-content:center;
`


export const StyledAreaEmployee = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  border-right: 1px solid grey;

  @media (max-width: 768px) {
    width: 100%; 
    order: 1;
    border-right: none; 
  }
`;

export const StyledAreaEmployee2 = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    order: 2; 
  }
`;
export const ImageDocument = styled.img`
width:50px;
height:60px;
margin-top:20px;
margin-left:10px;
`

export const StyledImageDocument = styled.img`
width:100%;
height:100%;
resize-mode:contain;
`
export const BoxImage = styled.div`
  position: relative;
  margin: 0 auto;
  width: 80vw;
  min-width: 80%;
  min-height: 40%;
  display: grid; /* Use grid display */
  grid-template-columns: 1fr 1fr; /* Two columns with equal width */
  grid-gap: 5vw; /* Optional: Adjust the gap between the columns */
  padding: 5vw; /* Optional: Add some padding inside the grid */
  overflow-y: auto;
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: auto;
  max-height: 90vh;
  overflow: auto;
  padding: 16px;
  background-color: white;
`;

export const StyledModal = styled(Modal)`
  width: 80vw;
  overflow-y: auto;
  margin: auto auto;
`

