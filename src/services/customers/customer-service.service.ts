import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  constructor(private http: HttpClient) {}

  getCustomerData(clienteId: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/getData?clienteId=${clienteId}`);
  }

  updateCustomer(clienteId: number, customerData: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/usuarios/update/${clienteId}`, customerData);
  }
}
