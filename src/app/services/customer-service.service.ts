import { Injectable } from '@angular/core';
import axios from 'axios';
import { Customer } from '../models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  url: string = "http://localhost:8080/api/v1/customers";
  headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
    'Content-Type': 'application/json'
  };

  constructor() { }

  getAll(pageIndex: number, pageSize: number) {
    return axios.get(`${this.url}?page=${pageIndex}&size=${pageSize}`, { headers: this.headers});
  }

  post(save: Customer) {
    return axios.post<Customer>(this.url, save, { headers: this.headers});
  }

  update(save: Customer, id: number) {
    return axios.put<Customer>(`${this.url}/${id}`, save, { headers: this.headers });
  }

  delete(id: number) {
    return axios.delete(`${this.url}/${id}`, { headers: this.headers });
  }
}
