import { Component,OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionModel } from '../../models/transaction-model';
import { TransactionService } from '../../services/transaction/transaction.service';

@Component({
  selector: 'transactions-page',
  imports: [CommonModule, FormsModule, ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsPage implements OnInit{
//   transactions: TransactionModel[] = [
//   {
//     name: 'Emma Richardson',
//     amount: 75.50,
//     transactionDate: '19 Aug 2024',
//     category: "Dinig out"
//   },
//   {
//     name: 'Savory Bites Bistro',
//     amount: -55.50,
//     transactionDate: '19 Aug 2024',
//     category: "General"
//   },
//   {
//     name: 'Daniel Carter',
//     amount: -42.30,
//     transactionDate: '18 Aug 2024',
    
//     category: "General"
//   },
//   {
//     name: 'Sun Park',
//     amount: 120.00,
//     transactionDate: '17 Aug 2024',
    
//     category: "Dinig out"
//   },
//   {
//     name: 'Urban Services Hub',
//     amount: -65.00,
//     transactionDate: '17 Aug 2024',
    
//     category: "Dinig out"
//   }
// ];

  searchTerm = '';
  selectedCategory = '';
  sortBy = 'date';
  sortOrder = 'desc';
  uniqueCategories: string[] = [];

//? API BackEnd
  transactions: TransactionModel[] = [];

  constructor(private transactionService: TransactionService) {  }

  ngOnInit(): void {
    this.extractUniqueCategories();
    this.transactionService.getAll().subscribe(data => {
      this.transactions = data;
    });

  }

  get filteredTransactions() {
    let result = [...this.transactions];

    // Filter by search term
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(tx =>
        tx.name.toLowerCase().includes(term) ||
        tx.category.toLowerCase().includes(term)
      );
    }

    // Filter by category
    if (this.selectedCategory) {
      result = result.filter(tx => tx.category === this.selectedCategory);
    }

    // Sort
    result.sort((a, b) => {
      let compare = 0;

      if (this.sortBy === 'amount') {
        compare = a.amount - b.amount;
      } else if (this.sortBy === 'name') {
        compare = a.name.localeCompare(b.name);
      } else if (this.sortBy === 'category') {
        compare = a.category.localeCompare(b.category);
      } else if (this.sortBy === 'date') {
        compare = new Date(a.transactionDate).getTime() - new Date(b.transactionDate).getTime();
      }

      return this.sortOrder === 'asc' ? compare : -compare;
    });

    return result;
  }

  extractUniqueCategories() {
    const categories = this.transactions.map(tx => tx.category);
    this.uniqueCategories = [...new Set(categories)];
  }


}
