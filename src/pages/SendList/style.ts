import { List } from "@mui/material";
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MainImage from "../../assets/images/background.png";



export const TextInput = styled(TextField)`
    width: 100%;
    height:30px;
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

    @media (min-width: 769px) {
    width: 30%;
  }

  margin-top:30px;
`

export const StyledInputDataArea = styled.div`
width:100%;
height:15%;
align-items:center;
justify-content:center;
display:flex;
`


export const StyledListArea = styled.div`
width:100%;
height:85%;
`
export const StyledAreaItemList = styled.div`
width:25%;
display:flex;
align-items:center;
justify-content:center;
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

export const StyledAreaInfo = styled.div`
width:40%;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
margin:3px;
`

export const StyledAreaEmployee2 = styled.div`
width:30%;
height:100%;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
`

export const StyledAreaModal = styled.div`
width:35%;
min-height:100%;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
overflow-y: auto;
@media (max-width:  1000px) {
  width:100%;
}
`

export const StyledAreaModal2 = styled.div`
width:15%;
height:100%;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
gap:35px;

@media (max-width:  1000px) {
  width:100%;
}
`

export const Container = styled.div`
width:100%;
height:100%;
display:flex;
flex-direction:row;
overflow-y:auto;
@media (max-width:  1000px) {
  flex-direction: column;
  width:100%;
  background-color:red
}

`

export const StyledContainerList = styled.div`
width:100%;
height:90%;
display:flex;
flex-direction:column;
align-items:center;
background-color:white;
border-radius:15px;
`

export const Logo = styled.img`
max-width:90%;
margin-top:-80px;
`

export const StyledImageDocument = styled.img`
width:300px;
height:100%;
`

export const StyledContainerInfracoes = styled.div`
width:80%;
min-height:50px;
display:flex;
flex-direction:row;
align-items:center;
background-color:white;
border-radius:15px;
flex-wrap:wrap
gap:20;
`

export const BoxSendList = styled.div`
width: 100vw,
height: 90%;
background-color: #F5CD59;
flex-direction:row;
display:flex;
`

export const ContainerSendList = styled.div`
display:flex;
align-items:center;
justify-content:center;
height:100vh;
width:100vw;
`

export const Cancel = styled.img`
width:35px;
position:absolute;
right:10px;
top:15px;
cursor:pointer;
`


export const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "80%",
  bgcolor: "#F5CD59",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  flexDirection: 'row',
  display:'flex',
  overflowY:'auto',

  '@media (max-width:  1000px)': {
    width: '85%',  // Adjust the width for smaller screens
    height: '90%', // Adjust the height for smaller screens
    flexDirection: 'column', // Change to column layout for smaller screens
  },
};

export const styleImage = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "20%",
  minHeight: "40%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  flexDirection:'row',
};