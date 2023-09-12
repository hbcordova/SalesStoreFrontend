import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerServiceService } from 'src/app/services/customer-service.service';

@Component({
  selector: 'app-customer-remove',
  templateUrl: './customer-remove.component.html',
  styleUrls: ['./customer-remove.component.css']
})
export class CustomerRemoveComponent {

  customerId: number = 0;

  constructor(public dialogRef: MatDialogRef<CustomerRemoveComponent>, private customerService: CustomerServiceService,
    @Inject(MAT_DIALOG_DATA) public data: { customerId: number } ) {
    this.customerId = data.customerId;
  }

  handleOption(result: boolean) {
    if (result) {
      this.deleteCustomer();
    }
    this.dialogRef.close(result);
  }

  async deleteCustomer() {
    await this.customerService.delete(this.customerId);
  }

}
