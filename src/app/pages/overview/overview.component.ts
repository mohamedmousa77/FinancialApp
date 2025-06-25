import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';


@Component({
  selector: 'overview',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {

  currentBalanceAmount = 600.000;
  expensesAmount = 600.000;
  incomeAmount = 1700;

  transactions = [
  {
    name: 'Emma Richardson',
    amount: 75.50,
    date: '19 Aug 2024',
    image: 'assets/images/emma.jpg'
  },
  {
    name: 'Savory Bites Bistro',
    amount: -55.50,
    date: '19 Aug 2024',
    image: 'assets/icons/bread.png'
  },
  {
    name: 'Daniel Carter',
    amount: -42.30,
    date: '18 Aug 2024',
    image: 'assets/images/daniel.jpg'
  },
  {
    name: 'Sun Park',
    amount: 120.00,
    date: '17 Aug 2024',
    image: 'assets/images/sun.jpg'
  },
  {
    name: 'Urban Services Hub',
    amount: -65.00,
    date: '17 Aug 2024',
    image: 'assets/icons/hub.png'
  }
];

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
recurringBills = [
  { label: 'Paid Bills', amount: 190.00, color: '#2a9d8f' },
  { label: 'Total Upcoming', amount: 194.98, color: '#f4a261' },
  { label: 'Due Soon', amount: 59.98, color: '#457b9d' }
];


budgetChartOptions = {
  responsive: true,
  cutout: '70%',
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
    // Plugin per disegnare testo al centro
    beforeDraw: (chart: any) => {
      const { width } = chart;
      const { height } = chart;
      const ctx = chart.ctx;
      ctx.restore();
      const fontSize = (height / 114).toFixed(2);
      ctx.font = `${fontSize}em sans-serif`;
      ctx.textBaseline = "middle";
      const text = `$${this.currentSpent}`;
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2;
      ctx.fillText(text, textX, textY);
      ctx.save();
    }
  }
};

}
