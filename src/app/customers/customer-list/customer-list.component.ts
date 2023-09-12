import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Customer } from 'src/app/models/Customer';
import { CustomerServiceService } from 'src/app/services/customer-service.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements AfterViewInit{

  displayedColumns: string[] = ['id', 'companyName', 'contactName', 'country', 'phone', 'actions'];
  dataSource = new MatTableDataSource<Customer>();
  length = 10;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent = new PageEvent();

  constructor(private customerService: CustomerServiceService) { }

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

}
