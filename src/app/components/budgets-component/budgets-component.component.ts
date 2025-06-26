import { Component } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'budgets-component',
  imports: [
    NgChartsModule,
    CommonModule,
  ],
  templateUrl: './budgets-component.component.html',
  styleUrl: './budgets-component.component.scss'
})
export class BudgetsComponentComponent {
// budgets
budgetLimit = 975;
currentSpent = 338;

budgetCategories = [
  { label: 'Entertainment', amount: 50, color: '#168aad' },
  { label: 'Bills', amount: 750, color: '#90e0ef' },
  { label: 'Dining Out', amount: 75, color: '#f9c89b' },
  { label: 'Personal Care', amount: 100, color: '#9d4edd' },
];

budgetChartData = {
  labels: this.budgetCategories.map(c => c.label),
  datasets: [{
    data: this.budgetCategories.map(c => c.amount),
    backgroundColor: this.budgetCategories.map(c => c.color)
  }]
};

budgetChartOptionsTest = {
  responsive: true,
  maintainAspectRatio: false, 
  cutout: '70%',
  plugins: {
    legend: { display: false }
  }
};

}
