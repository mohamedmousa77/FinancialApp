import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroment/enviroment';
import { Bill } from '../../models/bill-model';
@Injectable({
  providedIn: 'root'
})
export class BillService {
  private apiUrl = `${enviroment.apiUrl}/bills`
  constructor(private http: HttpClient) { }

  getAll(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.apiUrl);
  }

  get(id: number): Observable<Bill> {
    return this.http.get<Bill>(`${this.apiUrl}/${id}`);
  }

  create(Bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(this.apiUrl, Bill);
  }

  update(Bill: Bill): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${Bill.id}`, Bill);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
