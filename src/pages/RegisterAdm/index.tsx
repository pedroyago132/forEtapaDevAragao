import * as React from "react";
import { useContext } from "react";
import { AppContext } from '../../state';
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ButtonRegister, Body, Title, TextInput, Input, ContainerInput } from "./style";
import { createUser, validateUser } from './methods'; 
import { IError, IUser } from "../../interfaces";

export default function RegisterUser() {
  const { state, dispatch } = useContext(AppContext);

  const [user, setUser] = React.useState<IUser>({
    email: "",
    password: "",
    role: "",
    company: 0,
  });
  const [ error, setError ] = React.useState<IError>({error: false, message: ''})

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setUser((prev) => ({
      ...prev,
      [name]: value
    }));

  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setUser(prev => ({ ...prev, role: event.target.value as 'funcionario' | 'admin' }));
  };

  const handleRegisterClick = async () => {
    try {
      const responseData = await createUser(user);
      console.log(responseData);
      alert('User registered successfully!');
    } catch (error) {
      console.error('Failed to register user:', error);
      alert('Failed to register user. Please try again.');
    }
  };

  // Translation map
  const translations: Record<string, string> = {
    email: "E-mail",
    password: "Senha",
    role: "Tipo de Conta",
    
  };

  React.useEffect(() => {
    if (!validateUser(user)) {
      setError({error: true, message: 'Campos inválidos'})
    }
  }, [user])

  return (
    <Body>
      <Title variant="h5">Cadastrar Usuário</Title>
      {Object.keys(user).map((key) => {
        if (key !== 'role') { // We handle role separately due to the select input
          return (
            <React.Fragment key={key}>
              <TextInput
                id={`outlined-${key}`}
                name={key}
                value={user[key as keyof typeof user]}
                onChange={handleInputChange}
                label={translations[key] || key.charAt(0).toUpperCase() + key.slice(1)}
                variant="outlined"
                error={error.error}
                helperText={error.message}
              />
              <div style={{ height: '20px' }}></div>
            </React.Fragment>
          );
        }
      })}
      <ContainerInput>
        <Input id="demo-simple-select-label">Tipo de Conta</Input>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="role"
          value={user.role}
          label="Tipo de Conta"
          onChange={handleSelectChange}
        >
          <MenuItem value='User'>Funcionário</MenuItem>
          <MenuItem value='Admin'>Administrador</MenuItem>
        </Select>
      </ContainerInput>
      <div style={{ height: '40px' }}></div>

      <ButtonRegister variant="contained" onClick={handleRegisterClick}>Registrar</ButtonRegister>
    </Body>
  );
}
