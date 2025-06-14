import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO, GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./invoice.dto";

export default interface InvoiceFacadeInterface {
  generate(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto>;
  find(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO>;
}
