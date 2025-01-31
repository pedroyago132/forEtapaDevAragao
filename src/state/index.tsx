import * as React from "react";
import { createContext, useReducer } from "react";
import { ENUM_ACTIONS, USER_ACTIONS, LOGIN_ACTIONS } from "../enums";
import { IEmployee, IUser } from "../interfaces";

export const initialState = {
  isMobile: false,
  userType:'Client',
  userData: {
    password:'',
    role: '',
    ip: "",
    company: 0,
    razaoSocial: "",
    nomeFantasia: "",
    cnpj: 0,
    address: "",
    phone: 0,
    email:'',
    nome:''
  },

  employeeList: [
    {
      name: "",
      email: "",
      rg: "",
      cpf: "",
      father: "",
      mother: "",
      street: "",
      neighborhood: "",
      addressNumber: 0,
      complement: "",
      cep: 0,
      city: "",
      company: 0,
      uf: "",
      placa: "",
      modelo: "",
      group: "",
      cor: "",
      renevan: 0,
      status: "",
      condition: 0,
      birthdate: "",
      image: [],
      data:'',
      indexEmployee:0
    },
  ],

  clickMenu: 2,
  isLogged:false,

  theme: "light"
};

type AppState = {
  userType: string;
  isMobile: boolean;
  userData: IUser
  employeeList: IEmployee[];
  clickMenu: number;
  isLogged: boolean;
  theme: string;
};

type ACTIONTYPE =
  | { type: ENUM_ACTIONS.isMobile; payload: boolean }
  | { type: ENUM_ACTIONS.clickMenu; payload: number }
  | { type: ENUM_ACTIONS.changeTheme; payload: string }
  | { type: ENUM_ACTIONS.changeUserData; payload: IUser }
  | { type: ENUM_ACTIONS.changeLoggedState; payload: boolean }
  | { type: ENUM_ACTIONS.changeEmployeeListState; payload: IEmployee[] }
  | { type: ENUM_ACTIONS.saveEmailAction; payload: string }
  | { type: ENUM_ACTIONS.userType; payload: string };

function reducer(state: AppState, action: ACTIONTYPE) {
  console.log(action.type);
  switch (action.type) {
    case ENUM_ACTIONS.isMobile:
      return { ...state, isMobile: action.payload };

    case ENUM_ACTIONS.clickMenu:
      return { ...state, clickMenu: action.payload };

    case ENUM_ACTIONS.changeTheme:
      return { ...state, theme: action.payload };

    case ENUM_ACTIONS.changeUserData:
      return { ...state, userData: action.payload };

    case ENUM_ACTIONS.changeLoggedState:
      return { ...state, isLogged: action.payload };

    case ENUM_ACTIONS.changeEmployeeListState:
      return { ...state, employeeList: action.payload };

      case ENUM_ACTIONS.changeEmployeeListState:
      return { ...state, employeeList: action.payload };

      case ENUM_ACTIONS.userType:
      return { ...state, userType: action.payload };

      case ENUM_ACTIONS.saveEmailAction:
        return {
          ...state,
          userData: { ...state.userData, email: action.payload },
        };
    default:
      return state;
  }
}

//WORK HERE

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<ACTIONTYPE>;
}>({ state: initialState, dispatch: () => {} });

export function AppProvider(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
}

export { AppContext };
