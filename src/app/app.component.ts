import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { OverviewComponent } from './pages/overview/overview.component';
import { BillsPage } from './pages/bills/bills.component';
import { PotsPage } from './pages/pots/pots.component';
import { TransactionsPage } from './pages/transactions/transactions.component';
import { BudgetsPage } from './pages/budgets/budgets.component';
import { MenuComponent } from './components/menu/menu.component';
import { FinanceService } from './services/finance.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  imports: 
  [ 
    RouterOutlet, 
    OverviewComponent,
    MenuComponent,
    CommonModule,
    PotsPage,
    BillsPage,
    TransactionsPage,
    BudgetsPage
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'finance-frontend';
   pageIndex: number= 0;
   
   constructor(private financeService: FinanceService) { }
   private subscription!: Subscription;
    ngOnInit():void {
    this.subscription = this.financeService.pageIndex$.subscribe(
      value => {
        this.pageIndex = value;
      }
    )
    console.log(`This from STEPPER, saying that the page index vale a ${this.pageIndex}`);
  }

  ngOnDestroy (){
    this.subscription.unsubscribe();
  }
}

