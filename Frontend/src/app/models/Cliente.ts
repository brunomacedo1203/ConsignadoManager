export interface Cliente {
  id?: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  endereco: string;
  ativo: boolean;
  dataDeCriacao?: string;
  dataDeAlteracao?: string;
  tipoEmprestimo?: string;
  statusEmprestimo?: string;
  valorEmprestimo?: number;
  qtdParcelas?: number;
  valorParcela?: number;
  dataContratacao?: number;
}


