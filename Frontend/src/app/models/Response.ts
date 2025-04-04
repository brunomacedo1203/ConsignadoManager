export interface Response<T> {
  status: boolean;
  mensagem: string;
  dados?: T;
}
