import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Bill } from '../../models/bill-model';

@Component({
  selector: 'bills-page',
  imports: [CommonModule,FormsModule],
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.scss'
})
export class BillsPage {
  showModal= false;
  status= ['Due', 'Paid', 'Overdue'];
  bills: Bill[] = [
    {id: 1, amount: 10, billName:'Adobe Creative Suite', date:'', status:this.status[0]},
    {id: 2, amount: 3000, billName:'Car Insurance', date:'', status:this.status[1]},
    {id: 3, amount: 5000, billName:'Gym Membership', date:'', status:this.status[2]},
  ];
  searchTerm = '';
  sortBy = 'name';
  sortStatus = '';
  selectedStatus= '';
  editMode = false;
  editingId: number | null = null;
  selectedBillIndex: number | null = null;

  newBill = {
    billName: '',
    amount: 0,
    date: '', 
    status: '', 
  }

  get TotalPaid() {
    return this.bills
    .filter(bill => bill.status == 'Paid')
    .reduce((sum, bill) => sum + bill.amount, 0); 
  }
  get TotalUpcoming() {
    return this.bills
    .filter(bill => bill.status == 'Due')
    .reduce((sum, bill) => sum + bill.amount, 0); 
  }
  get TotalBills() {
    return this.bills.length;
  }

    get filteredBills() {
    let result = [...this.bills];

    // Filter by search term by bill name
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(tx =>
        tx.billName.toLowerCase().includes(term) 
        // ||  tx..toLowerCase().includes(term)
      );
    }

    // Filter by status
    if (this.selectedStatus) {
      result = result.filter(tx => tx.status === this.selectedStatus);
    }

    // Sort
    result.sort((a, b) => {
      let compare = 0;

      if (this.sortBy === 'amount') {
        compare = a.amount - b.amount;
      } else if (this.sortBy === 'name') {
        compare = a.billName.localeCompare(b.billName);
      } else if (this.sortBy === 'date') {
        compare = new Date(a.date).getTime() - new Date(b.date).getTime();
      }

      return this.sortBy === 'name' ? compare : -compare;
    });

    return result;
  }

  createOrUpdateBill() {
  if (!this.newBill.billName || this.newBill.amount <= 0 || !this.newBill.status) {
    alert("Please fill all fields correctly.");
    return;
  }
  if (this.selectedBillIndex !== null) {
      // Modifica
      this.bills[this.selectedBillIndex] = { ...this.newBill };
    } else {
      // Nuova creazione
      this.bills.push({ ...this.newBill});
    }

  this.closeModal();
}

  openModal() {
  this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }
  resetForm() {
    this.newBill = {
    billName: '',
    amount: 0,
    date: '', 
    status: 'Due', 
    };
  }

  openModalForEdit(bill: Bill) {
    this.editMode = true;
    this.editingId = bill.id!;
    this.selectedBillIndex = this.bills.findIndex(b => b.id === bill.id);  
    this.newBill = {
      billName: bill.billName,
      amount: bill.amount,
      date: bill.date,
      status :bill.status,
    };
    this.showModal = true;
  }

  deleteBudget(id: number) {
    this.bills = this.bills.filter(bill => bill.id !== id);
  }

}
