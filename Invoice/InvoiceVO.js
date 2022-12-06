class InvoiceVO {
  constructor(id, iban, discount) {
    this.id = id;
    this.iban = iban;
    this.discount = discount;
    this.items = [];
    this.total = 0;
  }
}

export default TodoVO;
