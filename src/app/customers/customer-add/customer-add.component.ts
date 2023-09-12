import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'src/app/models/Customer';
import { CustomerServiceService } from 'src/app/services/customer-service.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent {

  customer: Customer = new Customer();
  customerId: number = 0;

  customerForm: FormGroup = new FormGroup({
    companyName: new FormControl(this.customer.companyName, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30)
    ]),
    contactName: new FormControl(this.customer.contactName, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30)
    ]),
    contactTitle: new FormControl(this.customer.contactTitle, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30)
    ]),
    address: new FormControl(this.customer.address, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255)
    ]),
    city: new FormControl(this.customer.city, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(58)
    ]),
    region: new FormControl(this.customer.region, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    postalCode: new FormControl(this.customer.postalCode, [
      Validators.required,
      Validators.min(0),
      Validators.max(999999),
      Validators.pattern('[0-9]+')
    ]),
    country: new FormControl(this.customer.country, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(40)
    ]),
    phone: new FormControl(this.customer.phone, [
      Validators.required,
      Validators.min(100000000),
      Validators.max(999999999),
      Validators.pattern('[0-9]+')
    ]),
    fax: new FormControl(this.customer.fax, [
      Validators.required,
      Validators.min(1000000000),
      Validators.max(9999999999),
      Validators.pattern('[0-9]+')
    ])
  });

  get companyName() { return this.customerForm.get('companyName') }
  get contactName() { return this.customerForm.get('contactName') }
  get contactTitle() { return this.customerForm.get('contactTitle') }
  get address() { return this.customerForm.get('address') }
  get city() { return this.customerForm.get('city') }
  get region() { return this.customerForm.get('region') }
  get postalCode() { return this.customerForm.get('postalCode') }
  get country() { return this.customerForm.get('country') }
  get phone() { return this.customerForm.get('phone') }
  get fax() { return this.customerForm.get('fax') }

  constructor(public dialogRef: MatDialogRef<CustomerAddComponent>, private customerService: CustomerServiceService,
    @Inject(MAT_DIALOG_DATA) public data: { customerId: number } ) {
      if (data.customerId != 0) {
        this.getById(data.customerId);
        this.customerId = data.customerId;
      }
    }

  async getById(id: number) {
    await this.customerService.getById(id)
      .then(
        response => {
          this.customerForm.get("companyName")?.setValue(response.data.companyName);
          this.customerForm.get("contactName")?.setValue(response.data.contactName);
          this.customerForm.get("contactTitle")?.setValue(response.data.contactTitle);
          this.customerForm.get("address")?.setValue(response.data.address);
          this.customerForm.get("city")?.setValue(response.data.city);
          this.customerForm.get("region")?.setValue(response.data.region);
          this.customerForm.get("postalCode")?.setValue(response.data.postalCode);
          this.customerForm.get("country")?.setValue(response.data.country);
          this.customerForm.get("phone")?.setValue(response.data.phone);
          this.customerForm.get("fax")?.setValue(response.data.fax);

        },
        error => console.log(error)
      )
      .catch(error => console.log(error));
  }

  getErrorMessage(fieldName: string, fieldNameTitle: string, minLength: number, maxLength: number) {
    if (this.customerForm.get(fieldName)?.hasError('required')) {
      return 'You must enter a value';
    } else if (this.customerForm.get(fieldName)?.hasError('minlength')) {
      return `${fieldNameTitle} must be more than ${minLength} characters`;
    } else if (this.customerForm.get(fieldName)?.hasError('maxlength')) {
      return `${fieldNameTitle} must be less than ${maxLength} characters`;
    } else if (this.customerForm.get(fieldName)?.hasError('min')) {
      return `${fieldNameTitle} must have ${maxLength} numbers`;
    } else if (this.customerForm.get(fieldName)?.hasError('max')) {
      return `${fieldNameTitle} must have ${maxLength} numbers`;
    } else if (this.customerForm.get(fieldName)?.hasError('pattern')) {
      return `${fieldNameTitle} must have only numbers`;
    } else {
      return '';
    }
  }

  sendHandler() {
    if (this.customerForm.valid) {
      if (this.customerId != 0) {
        this.updateCustomer();
      } else {
        this.saveCustomer();
      }
    }
  }

  saveCustomer() {
    this.customerService.post(this.customerForm.getRawValue())
    .then((response) => {
      console.log("Se guardo satisfactoriamente!!");
      this.customer.reset();
      this.dialogRef.close(response.data);
    }, (error) => {
      console.log(error);
    }).catch(error => {
      console.log("Server error!");
    })
  }

  updateCustomer() {
    this.customerService.update(this.customerForm.getRawValue(), this.customerId)
        .then((response) => {
          console.log("Se actualizo satisfactoriamente!!");
          this.customer.reset();
          this.dialogRef.close(response.data);
        }, (error) => {
          console.log(error);
        }).catch(error => {
          console.log("Server error!");
        })
  }
}
