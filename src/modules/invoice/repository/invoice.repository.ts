import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../domain/invoice-items.entity";
import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import { InvoiceItemsModel } from "./invoice-items.model";
import { InvoiceModel } from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {

  async add(invoice: Invoice): Promise<void> {
    await InvoiceModel.create({
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map((item: InvoiceItems) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      total: invoice.total,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    }, {
      include: [InvoiceItemsModel]
    });
  }


  async find(id: string): Promise<Invoice> {

    const invoiceDB = await InvoiceModel.findOne({
      where: { id },
      include: [InvoiceItemsModel]
    });
    return (
      new Invoice({
        id: new Id(invoiceDB.id),
        name: invoiceDB.name,
        document: invoiceDB.document,
        address: new Address(
          invoiceDB.street,
          invoiceDB.number,
          invoiceDB.complement,
          invoiceDB.city,
          invoiceDB.state,
          invoiceDB.zipCode,
        ),
        items: invoiceDB.items.map(
          (item) => new InvoiceItems({
            id: new Id(item.id),
            name: item.name,
            price: item.price,
          })
        ),
        total: invoiceDB.total,
        createdAt: invoiceDB.createdAt,
        updatedAt: invoiceDB.updatedAt,
      })
    );
  }
}