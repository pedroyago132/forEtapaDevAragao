import { ENUM_ACTIONS, USER_ACTIONS,LOGIN_ACTIONS } from "../enums"
import { IClient, IEmployee, IError, IUser } from "../interfaces"

export const isMobileAction = (payload: boolean, dispatch: any): void => {
    dispatch({ type: ENUM_ACTIONS.isMobile, payload: payload})
}

export const menuClickAction = (payload: number, dispatch: any): void => {
    dispatch({ type: ENUM_ACTIONS.clickMenu, payload: payload})
}

export const emailAction = (payload: string, dispatch: any): void => {
    dispatch({ type: USER_ACTIONS.email, payload: payload})
}

export const passwordAction = (payload: string, dispatch: any): void => {
    dispatch({ type: USER_ACTIONS.password, payload: payload})
}

export const matriculaAction = (payload: string, dispatch: any): void => {
    dispatch({ type: USER_ACTIONS.matricula, payload: payload})
}

export const customerAction = (payload: string, dispatch: any): void => {
    dispatch({ type: USER_ACTIONS.customer, payload: payload})
}

export const emailLoginAction = (payload: string, dispatch: any): void => {
    dispatch({ type: LOGIN_ACTIONS.emailLogin, payload: payload})
}

export const passwordLoginAction = (payload: string, dispatch: any): void => {
    dispatch({ type: LOGIN_ACTIONS.passwordLogin, payload: payload})
}

export const userDataAction = (payload: IUser, dispatch: any): void => {
    dispatch({ type: ENUM_ACTIONS.changeUserData, payload: payload})
}

export const changeLoginStateAction = (payload: boolean, dispatch: any): void => {
    dispatch({ type: ENUM_ACTIONS.changeLoggedState, payload: payload})
}

export const errorAction = (payload: IError, dispatch: any): void => {
    dispatch({ type: ENUM_ACTIONS.changeUserData, payload: payload})
}

export const listEmployeeAction = (payload: IEmployee[], dispatch: any): void => {
    dispatch({ type: ENUM_ACTIONS.changeEmployeeListState, payload: payload})
}

export const userTypeAction = (payload: string, dispatch: any): void => {
    dispatch({ type: ENUM_ACTIONS.userType, payload: payload})
}



