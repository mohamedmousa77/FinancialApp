import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'transactions-component',
  imports: [CommonModule],
  templateUrl: './transactions-component.component.html',
  styleUrl: './transactions-component.component.scss'
})
export class TransactionsComponentComponent {
transactions = [
  {
    name: 'Emma Richardson',
    amount: 75.50,
    date: '19 Aug 2024',
    image: 'person-placeholder.png'
  },
  {
    name: 'Savory Bites Bistro',
    amount: -55.50,
    date: '19 Aug 2024',
    image: 'person-placeholder.png'
  },
  {
    name: 'Daniel Carter',
    amount: -42.30,
    date: '18 Aug 2024',
    image: 'person-placeholder.png'
  },
  {
    name: 'Sun Park',
    amount: 120.00,
    date: '17 Aug 2024',
    image: 'person-placeholder.png'
  },
  {
    name: 'Urban Services Hub',
    amount: -65.00,
    date: '17 Aug 2024',
    image: 'person-placeholder.png'
  }
];

}
