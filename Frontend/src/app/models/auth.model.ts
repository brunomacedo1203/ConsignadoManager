export interface LoginCredentials {
  email: string;
  senha: string;
}

export interface User {
  id: number;
  nome: string;
  email: string;
  cargo: 'ADMIN' | 'GERENTE' | 'ANALISTA';
  token: string;
}

export interface AuthResponse {
  status: boolean;
  mensagem: string;
  dados?: {
    usuario: {
      id: number;
      nome: string;
      email: string;
      cargo: 'ADMIN' | 'GERENTE' | 'ANALISTA';
    };
    token: string;
  };
}

export interface RegisterUser {
  nome: string;
  email: string;
  senha: string;
  cargo: 'ADMIN' | 'GERENTE' | 'ANALISTA';
}

