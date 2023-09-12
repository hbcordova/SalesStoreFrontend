class Customer {
  id: number = 0;
  companyName: string = '';
  contactName: string = '';
  contactTitle: string = '';
  address: string = '';
  city: string = '';
  region: string = '';
  postalCode: string = '';
  country: string = '';
  phone: string = '';
  fax: string = '';

  reset() {
    this.id = 0;
    this.companyName = '',
    this.contactName = '';
    this.contactTitle = '';
    this.address = '';
    this.city = '';
    this.region = '';
    this.postalCode = '';
    this.country = '';
    this.phone = '';
    this.fax = '';
  }
}

export { Customer };
