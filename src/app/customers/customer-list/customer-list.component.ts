import { AfterViewInit, Component} from '@angular/core';
import { PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/models/Customer';
import { CustomerServiceService } from 'src/app/services/customer-service.service';
import { CustomerAddComponent } from '../customer-add/customer-add.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomerRemoveComponent } from '../customer-remove/customer-remove.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements AfterViewInit{

  displayedColumns: string[] = ['id', 'companyName', 'contactName', 'country', 'phone', 'actions'];
  dataSource = new MatTableDataSource<Customer>();
  length = 10;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent = new PageEvent();

  constructor(private customerService: CustomerServiceService, public dialog: MatDialog) { }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.getAllCustomer();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  ngAfterViewInit(): void {
    this.getAllCustomer();
  }

  async getAllCustomer() {
    let response = await this.customerService.getAll(this.pageIndex, this.pageSize);

    this.length = response.data.totalElements;
    this.dataSource = new MatTableDataSource<Customer>(response.data.content);
  }

  openDialog() {
    const dialogRef = this.dialog.open(CustomerAddComponent, {data: { customerId: 0 }});

    dialogRef.afterClosed().subscribe(result => {
      this.dataSource.data.push(result);
    });
  }

  updateDialog(customerId: number) {
    const dialogRef = this.dialog.open(CustomerAddComponent, {data: { customerId: customerId }});

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.dataSource.data.map(customer => {
          if (customer.id == customerId) {
            customer.companyName = result.companyName;
            customer.contactName = result.contactName;
            customer.contactTitle = result.contactTitle;
            customer.address = result.address;
            customer.region = result.region;
            customer.city = result.city;
            customer.postalCode = result.postalCode;
            customer.country = result.country;
            customer.phone = result.phone;
            customer.fax = result.fax;
          }
        })
      }
    });
  }

  deleteDialog(customerId: number) {
    const dialogRef = this.dialog.open(CustomerRemoveComponent, {data: { customerId: customerId }});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(customer => customer.id != customerId);
      }
    });
  }
}
