import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroment/enviroment';
import { Budget } from '../../models/budget-model';

@Injectable({
  providedIn: 'root'
})
export class BudgetServices {
private apiUrl = `${enviroment.apiUrl}/Budgets`;
  constructor(private http: HttpClient) { }

  getAll(): Observable<Budget[]> {
      return this.http.get<Budget[]>(this.apiUrl);
    }
  
    get(id: number): Observable<Budget> {
      return this.http.get<Budget>(`${this.apiUrl}/${id}`);
    }
  
    create(Budget: Budget): Observable<Budget> {
      console.log("Create called")
      return this.http.post<Budget>(this.apiUrl, Budget);
    }
  
    update(Budget: Budget): Observable<void> {
      console.log("update called")
      return this.http.put<void>(`${this.apiUrl}/${Budget.id}`, Budget);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
