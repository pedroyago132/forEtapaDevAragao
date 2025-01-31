export interface IUser {
password: string
role?: string
ip?: string | string[]
company?: number
razaoSocial?: string
nomeFantasia?: string
cnpj?: number
address?: string
phone?: number
email: string
}

export interface IError {
    error: boolean
    message: string
}

export interface IEmployee {
    data: any
    name: string
    email?: string
    rg: string
    cpf: string
    father: string
    mother: string
    street: string
    neighborhood: string
    addressNumber: number
    complement: string
    cep: number
    city: string
    company:number
    uf: string
    placa?: string
    modelo?: string
    group: string
    cor?: string
    renevan?:number
    status?: string
    condition: number
    birthdate:string
    image?: string[]
    indexEmployee?:number
    tituloEleitor?:string
}

export interface IClient {
    razaoSocial: string,
    nomeFantasia: string,
    cnpj: number, // Exemplo de número
    address: string,
    phone: number, // Exemplo de número
    nome: string, // This will store the name of the user
    email: string,
    ip?:string | string[] , // Exemplo de número
    role?:string
}

export interface ColumnWrapperProps {
    gap: string;
}

export interface IEmployeeData {
    name: string
    email?: string
    rg: string
    cpf: string
    father: string
    mother: string
    street: string
    neighborhood: string
    addressNumber: number
    complement: string
    cep: number
    city: string
    company:number
    uf: string
    placa?: string
    modelo?: string
    group: string
    cor?: string
    renevan?:number
    status?: string
    condition: number
    birthdate:string
    image?: string[]
  }