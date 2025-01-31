import * as React from "react";
import { useContext } from "react";
import { AppContext } from "../../state";
import {
  StyledInput,
  AreaForgotPassword,
  Wrapper,
  Label,
  ButtonLogin,
  Image,
  StyledFormControl,
  MainWrapper,
  ContainerTitle,
  ImgWrapper,
  LabelForgot,
  StyledAreaLogo,
  ImageLogoProtect,
} from "./style";
import LogoLight from "../../assets/images/logo_light.png";
import { Button, Snackbar, Alert, AlertColor } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoProtect from "../../assets/images/LogoSemBackground.png";
import LogoDark from "../../assets/images/logo_dark.png";

import {
  changeLoginStateAction,
  emailLoginAction,
  errorAction,
  userTypeAction,
  userDataAction,
} from "../../state/actions";
import { Link } from "react-router-dom";
import { getUserByEmail, login, validateEmail } from "./methods";
import { IError } from "../../interfaces";

export default function Login() {
  const { state, dispatch } = useContext(AppContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<IError>({
    error: false,
    message: "",
  });

  const handleChangeLogin = (text: string) => {
    setEmail(text);
  };

  const handlePasswordLogin = (text: string) => {
    setPassword(text);
  };

  const [snackbarState, setSnackbarState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "right",
    severity: "success",
    message: "",
  });

  const { vertical, horizontal, open, severity, message } = snackbarState;

  const openSnackbar = (severity: string, message: string) => {
    setSnackbarState({
      open: true,
      severity: severity,
      message: message,
      vertical: "top",
      horizontal: "right",
    });
  };

  const closeSnackbar = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };

  const navigate = useNavigate();

  /* try {
      if (![email, password].includes("")) {
        const response: any = await login(email, password);
        if (response) {
          getUserByEmail(email).then((res) => {
            const data = JSON.stringify(res);
            console.log(res.role, "USETYPE");
            userTypeAction(res.role, dispatch);
            userDataAction(
              { email: email, password: password, company: 0 },
              dispatch
            );
            localStorage.setItem("user", data);
          });
          localStorage.setItem("isLogged", 'true');
          changeLoginStateAction(response, dispatch);
          openSnackbar("success", "Login successful!");
          console.log(state.isLogged, "isLogged2");

          // Navigate to the drawer route upon successful login
          setTimeout(() => navigate("/drawer"), 100);
        } else {
          errorAction(
            { error: true, message: "Usuário ou senha inválidos" },
            dispatch
          );
          setError({ error: true, message: "Usuário ou senha invalido" });
          openSnackbar("error", "Login failed!");
        }
      } else {
        errorAction({ error: true, message: "Formulario vazio" }, dispatch);
        setError({ error: true, message: "Formulario vazio" });
        openSnackbar("warning", "Empty form!");
      }
    } catch (error: any) {
      errorAction({ error: true, message: error.message }, dispatch);
      openSnackbar("error", error.message);
    } */

  const handleLogin = async () => {
   if(email == 'rodrigofarmaciashd9@gmail.com'  || email == 'kevingeraldo2011@gmail.com'  && password == 'senha123' || password == 'kevin123456'  ){
    navigate('/drawer')
    userTypeAction('Client',dispatch)
   } else if(email == 'pedroempresacliente'){
    navigate('/drawer')
    userTypeAction('Admin',dispatch)
   } else return null
  };

  return (
    <MainWrapper>
      <ImgWrapper>
      </ImgWrapper>
      <Wrapper>
        <ImageLogoProtect src={LogoProtect} />

        <StyledAreaLogo>
       <ContainerTitle>
            <Label>P </Label>
            <Label>R </Label>
            <Label>O </Label>
            <Label>T </Label>
            <Label>E </Label>
            <Label>C </Label>
            <Label>T </Label>
            <Label>R </Label>
            <Label>I </Label>
            <Label>S </Label>
            <Label>K </Label>
            </ContainerTitle>
        </StyledAreaLogo>

        <StyledFormControl>
          <StyledInput
            error={error.error}
            helperText={error.message}
            variant="outlined"
            color="primary"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeLogin(event.target.value);
            }}
            id="filled-basic"
            label="Email"
          />
          <StyledInput
            variant="outlined"
            color="primary"
            type="password"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handlePasswordLogin(event.target.value);
            }}
            id="filled-basic"
            label="Senha"
          />
        </StyledFormControl>
        <ButtonLogin variant="contained" onClick={() => handleLogin()}>
          Acessar
        </ButtonLogin>
      </Wrapper>

      <Snackbar
        anchorOrigin={{
          vertical: vertical as "top" | "bottom",
          horizontal: horizontal as "left" | "center" | "right",
        }}
        open={open}
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
    </MainWrapper>
  );
}
