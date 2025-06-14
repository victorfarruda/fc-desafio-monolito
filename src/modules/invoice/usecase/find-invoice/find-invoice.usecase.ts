import InvoiceGateway from "../../gateway/invoice.gateway";
import { InputFindInvoiceUseCaseDto, OutputFindInvoiceUseCaseDto } from "../find-invoice/find-invoice.usecase.dto";

export default class FindInvoiceUseCase {

  private _invoiceRepository: InvoiceGateway

  constructor(invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository
  }

  async execute(input: InputFindInvoiceUseCaseDto): Promise<OutputFindInvoiceUseCaseDto> {
    const invoice = await this._invoiceRepository.find(input.id);
    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: invoice.address,
      items: invoice.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })),
      total: invoice.total,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    };
  }
}
