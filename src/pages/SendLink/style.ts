import { List } from "@mui/material";
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MainImage from "../../assets/images/99a04846-7fde-4cd1-ad20-f2bd40b29394.jpeg";



export const TextInput = styled(TextField)`
    width: 60vw;
    height:40px;
    margin-top:50px;
`

export const Title = styled(Typography)`
  align-self:center;
  font-weight:600;
  margin:20;
  font-size:18;
`

export const ButtonRegister = styled(Button)`
margin-top:30px;
`
export const Body = styled.div`
    width: 100%;
    min-height: 100vh;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    margin-top:40px;
    gap: 3vh;
    @media (max-width:  1000px) {
      margin-top:20vw;
      align-text:center;
    }
`

export const Input = styled(InputLabel)`
width:100%;
`

export const ContainerInput = styled(FormControl)`
margin-top:35px;
width:60vw;
`

export const StyledInput = styled(TextField)`
@media (max-width:  1000px) {
    width: 80%;
  }

    @media (min-width:  1000px) {
    width: 30%;
  }

  margin-top:30px;
`
