import { Sequelize } from "sequelize-typescript";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";
import { InvoiceItemsModel } from "../repository/invoice-items.model";
import { InvoiceModel } from "../repository/invoice.model";

const input = {
  id: '123',
  name: 'John Doe',
  document: '123456789',
  street: 'Street',
  number: '123',
  complement: 'Complement',
  city: 'City',
  state: 'State',
  zipCode: '12345678',
  items: [
    { id: '123', name: 'Item 1', price: 10 },
    { id: '456', name: 'Item 2', price: 20 },
  ],
};

describe('Integration test Invoice facade', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([InvoiceModel, InvoiceItemsModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should generate an invoice', async () => {
    const invoiceFacade = InvoiceFacadeFactory.create();
    const output = await invoiceFacade.generate(input);

    expect(output.id).toEqual(input.id);
    expect(output.name).toEqual(input.name);
    expect(output.document).toEqual(input.document);
    expect(output.address.street).toEqual(input.street);
    expect(output.address.number).toEqual(input.number);
    expect(output.address.complement).toEqual(input.complement);
    expect(output.address.city).toEqual(input.city);
    expect(output.address.state).toEqual(input.state);
    expect(output.address.zipCode).toEqual(input.zipCode);
    expect(output.items.length).toEqual(input.items.length);
    expect(output.items[0].id).toEqual(input.items[0].id);
    expect(output.items[0].name).toEqual(input.items[0].name);
    expect(output.items[0].price).toEqual(input.items[0].price);
    expect(output.items[1].id).toEqual(input.items[1].id);
    expect(output.items[1].name).toEqual(input.items[1].name);
    expect(output.items[1].price).toEqual(input.items[1].price);
    expect(output.total).toEqual(input.items.reduce((acc, item) => acc + item.price, 0));
  });

  it('should find an invoice', async () => {
    const invoiceFacade = InvoiceFacadeFactory.create();
    await invoiceFacade.generate(input);

    const output = await invoiceFacade.find({ id: input.id });

    expect(output.id).toEqual(input.id);
    expect(output.name).toEqual(input.name);
    expect(output.document).toEqual(input.document);
    expect(output.address.street).toEqual(input.street);
    expect(output.address.number).toEqual(input.number);
    expect(output.address.complement).toEqual(input.complement);
    expect(output.address.city).toEqual(input.city);
    expect(output.address.state).toEqual(input.state);
    expect(output.address.zipCode).toEqual(input.zipCode);
    expect(output.items.length).toEqual(input.items.length);
    expect(output.items[0].id).toEqual(input.items[0].id);
    expect(output.items[0].name).toEqual(input.items[0].name);
    expect(output.items[0].price).toEqual(input.items[0].price);
    expect(output.items[1].id).toEqual(input.items[1].id);
    expect(output.items[1].name).toEqual(input.items[1].name);
    expect(output.items[1].price).toEqual(input.items[1].price);
    expect(output.total).toEqual(input.items[0].price + input.items[1].price);
  });

});