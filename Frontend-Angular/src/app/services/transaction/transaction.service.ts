import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroment/enviroment.prod';
import { TransactionModel } from '../../models/transaction-model';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
private apiUrl = `${enviroment.apiUrl}/TransactionModels`;
  constructor(private http: HttpClient) { }

  getAll(): Observable<TransactionModel[]> {
    return this.http.get<TransactionModel[]>(this.apiUrl);
  }

  get(id: number): Observable<TransactionModel> {
    return this.http.get<TransactionModel>(`${this.apiUrl}/${id}`);
  }

  create(TransactionModel: TransactionModel): Observable<TransactionModel> {
    return this.http.post<TransactionModel>(this.apiUrl, TransactionModel);
  }

  update(TransactionModel: TransactionModel): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${TransactionModel.id}`, TransactionModel);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
