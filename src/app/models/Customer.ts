class Customer {
  id: number;
  companyName: string;
  contactName: string;
  contactTitle: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  phone: string;
  fax: string;

  constructor(id: number = 0, companyName: string, contactName: string, contactTitle: string, address: string,
    city: string, region: string, postalCode: string, country: string, phone: string, fax: string) {
      this.id = id;
      this.companyName = companyName;
      this.contactName = contactName;
      this.contactTitle = contactTitle;
      this.address = address;
      this.city = city;
      this.region = region;
      this.postalCode = postalCode;
      this.country = country;
      this.phone = phone;
      this.fax = fax;
  }
}

export { Customer };
