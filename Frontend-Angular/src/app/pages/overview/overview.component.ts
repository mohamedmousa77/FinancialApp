import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

import { PotsComponent } from '../../components/pots/pots.component';
import { TransactionsComponentComponent } from '../../components/transactions-component/transactions-component.component';
import { BudgetsComponentComponent } from '../../components/budgets-component/budgets-component.component';
import { RecurringBillsComponentComponent } from '../../components/recurring-bills-component/recurring-bills-component.component';
@Component({
  selector: 'overview',
  standalone: true,
  imports: [
    CommonModule, 
    NgChartsModule,
    PotsComponent,
    TransactionsComponentComponent,
    BudgetsComponentComponent,
    RecurringBillsComponentComponent
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {

  currentBalanceAmount = 600.000;
  expensesAmount = 600.000;
  incomeAmount = 1700;

  
// // budgets
// budgetLimit = 975;
// currentSpent = 338;

// budgetCategories = [
//   { label: 'Entertainment', amount: 50, color: '#168aad' },
//   { label: 'Bills', amount: 750, color: '#90e0ef' },
//   { label: 'Dining Out', amount: 75, color: '#f9c89b' },
//   { label: 'Personal Care', amount: 100, color: '#9d4edd' },
// ];

// budgetChartData = {
//   labels: this.budgetCategories.map(c => c.label),
//   datasets: [{
//     data: this.budgetCategories.map(c => c.amount),
//     backgroundColor: this.budgetCategories.map(c => c.color)
//   }]
// };

// budgetChartOptionsTest = {
//   responsive: true,
//   maintainAspectRatio: false, 
//   cutout: '70%',
//   plugins: {
//     legend: { display: false }
//   }
// };

}
