import { List } from "@mui/material";
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

export const TextInput = styled(TextField)`
    width: 60vw;
    height:40px;
    margin-top:50px;
`

export const Title = styled(Typography)`
  align-self:center;
  margin:20;
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
    margin-top:5vw;
    gap: 3vh;
`

export const Input = styled(InputLabel)`
width:100%;
`

export const ContainerInput = styled(FormControl)`
margin-top:35px;
width:60vw;
`
