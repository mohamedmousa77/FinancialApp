import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroment/enviroment';
import { Pot } from '../../models/pot-model';

@Injectable({
  providedIn: 'root'
})
export class PotService {
  private apiUrl = `${enviroment.apiUrl}/pots`
  constructor(private http: HttpClient) { }

    getAll(): Observable<Pot[]> {
      return this.http.get<Pot[]>(this.apiUrl);
    }
  
    get(id: number): Observable<Pot> {
      return this.http.get<Pot>(`${this.apiUrl}/${id}`);
    }
  
    create(Pot: Pot): Observable<Pot> {
      return this.http.post<Pot>(this.apiUrl, Pot);
    }
  
    update(Pot: Pot): Observable<void> {
      return this.http.put<void>(`${this.apiUrl}/${Pot.id}`, Pot);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }  
}
