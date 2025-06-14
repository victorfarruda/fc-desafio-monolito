import { default as Address } from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../../domain/invoice-items.entity";
import Invoice from "../../domain/invoice.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { InputGenerateInvoiceUseCaseDto, OutputGenerateInvoiceUseCaseDto } from "./generate-invoice.usecase.dto";

export default class GenerateInvoiceUseCase {

  private _invoiceRepository: InvoiceGateway

  constructor(invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository
  }

  async execute(input: InputGenerateInvoiceUseCaseDto): Promise<OutputGenerateInvoiceUseCaseDto> {

    const props = {
      id: new Id(input.id) || new Id(),
      name: input.name,
      document: input.document,
      address: new Address(
        input.street,
        input.number,
        input.complement,
        input.city,
        input.state,
        input.zipCode,
      ),
      items: input.items.map((item) => new InvoiceItems({
        id: new Id(item.id) || new Id(),
        name: item.name,
        price: item.price,
      })),
      total: input.items.reduce((s, item) => {
        return s + item.price;
      }, 0)
    }

    const invoice = new Invoice(props)
    await this._invoiceRepository.add(invoice)

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: {
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
      },
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
      items: invoice.items.map((item) => {
        return {
          id: item.id.id,
          name: item.name,
          price: item.price,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }
      }),
      total: invoice.total
    }
  }
}