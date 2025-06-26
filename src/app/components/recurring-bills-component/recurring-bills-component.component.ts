import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'recurring-bills-component',
  imports: [CommonModule],
  templateUrl: './recurring-bills-component.component.html',
  styleUrl: './recurring-bills-component.component.scss'
})
export class RecurringBillsComponentComponent {

recurringBills = [
  { label: 'Paid Bills', amount: 190.00, color: '#2a9d8f' },
  { label: 'Total Upcoming', amount: 194.98, color: '#f4a261' },
  { label: 'Due Soon', amount: 59.98, color: '#457b9d' }
];
}
