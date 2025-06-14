
export interface InputFindInvoiceUseCaseDto {
  id: string;
};

export interface OutputFindInvoiceUseCaseDto {
  id: string;
  name: string;
  document: string;
  address: {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: {
    id: string;
    name: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}