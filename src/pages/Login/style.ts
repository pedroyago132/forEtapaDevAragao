import { FormControl, List } from "@mui/material";
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MainImage from "../../assets/images/99a04846-7fde-4cd1-ad20-f2bd40b29394.jpeg";


export const FormWrapper = styled.div`
  position: relative;
  width: 50vw;
`

export const StyledFormControl = styled(FormControl)`
    width: 100vw;
    display: flex;
    position: relative;
    flex-direction: column;
    gap: 5vh;
    align-self: center;
    align-items: center;
    margin: auto auto;
`

export const Wrapper = styled.div`
    width: 50vw;
    position: relative;
    display:flex;
    align-items:center;
    flex-direction:column;
    gap: 5vh;
    @media (max-width: 768px) {
      width: 100vw;
    }
`

export const InputWrapper = styled.div`
margin: auto auto;
width: 50vw;
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

export const AreaForgotPassword = styled.div`
@media (max-width:  1000px) {
    width: 80%;
  }

    @media (min-width:  1000px) {
    width: 30%;
  }

  display:flex;
  justify-content:flex-end;
`
export const Label = styled.label`
 font-weight:600;
 font-size:17px;
 color:black;
 padding:10px;
 font-family:ProBold;
`

export const LabelForgot = styled.label`
 font-weight:600;
 font-size:15px;
 color:black;
 margin-top:30px;
`

export const ButtonLogin = styled(Button)`
 width:160px;
 margin-top:35px;
 color:white;
`

export const Image = styled.img`
width:26vw;
margin-top:5vw;
@media (max-width: 1000px) {
  height:40vw;
}
`

export const StyledImage = styled.img`
@media (max-width:  1000px) {
  display:none;
}
`

export const MainWrapper = styled.div`
    display: flex;
    width: max-content;
    flex-direction: row;
    overflow: hidden;
    @media (max-width:  1000px) {
      flex-direction: column;
    }
`

export const ImgWrapper = styled.div`
  position: relative;
  width: 50vw;
  height: 100vh;
  background-image: url(${MainImage});
  background-position: center;
  backgroud-size: cover;
  @media (max-width: 768px) {
    display:none;
  }
`

export const ContainerTitle = styled.div`
width:80%;
gap: 16px;
flexDirection: row;
align-tems: center;
justify-content: center;
display: flex;
  @media (max-width: 1000px) {
    width:100%;
    gap:0;
    margin-top:-35px;
  }
`

export const StyledAreaLogo = styled.div`
margin-top:-40px;
width:100%;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
`
export const ImageLogoProtect = styled.img`
width:80%;
margin-top:5vw;
@media (max-width:  1000px) {
  height:70vw;
}
`
