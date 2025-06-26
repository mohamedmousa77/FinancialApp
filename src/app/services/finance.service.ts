import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private pageIndexSubject = new BehaviorSubject<number>(0);
  pageIndex$ = this.pageIndexSubject.asObservable();
  
  constructor() { }

  switchPage(newPageIndex: number): void {
    console.log( `Services called: current page index ${this.pageIndexSubject.value} new page index ${newPageIndex}`);
    // const current = this.pageIndexSubject.value;
    this.pageIndexSubject.next(newPageIndex);
  }

  goBack(): void {
    const current = this.pageIndexSubject.value;
    this.pageIndexSubject.next(current - 1);
  }
}
