import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";


type InvoiceItemsProps = {
  id?: Id;
  name: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
};


export default class InvoiceItems extends BaseEntity {
  _name: string
  _price: number

  constructor(
    props: InvoiceItemsProps
  ) {
    super(props.id, props.createdAt, props.updatedAt)
    this._name = props.name
    this._price = props.price
  }

  get name() {
    return this._name
  }

  get price() {
    return this._price
  }
}