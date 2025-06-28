import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Budget } from '../../models/budget-model';

@Component({
  selector: 'budgets-page',
  imports: [CommonModule,FormsModule],
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.scss'
})

export class BudgetsPage {
editMode = false;
editingId: number | null = null;
selectedBudgetIndex: number | null = null;
showModal = false;


budgets: Budget[] = [
  {id:1, category: 'Entertainment', amount: 50, spent: 15, color: '#13635b' },
  {id:2, category: 'Bills', amount: 750, spent: 250, color: '#78c4d4' },
  
];

newBudget = {
  category: '',
  amount: 0,
  color: '',
  spent: 0,
};

themeColors = ['#2F8F9D', '#97C4D6', '#F2C57C', '#595260', '#D1493F', '#F29E4C', '#70AE6E', '#00BFFF'];

openModal() {
  this.showModal = true;
}

closeModal() {
  this.showModal = false;
  this.resetForm();
}

selectColor(color: string) {
  this.newBudget.color = color;
}

createBudget() {
  if (!this.newBudget.category || this.newBudget.amount <= 0 || !this.newBudget.color) {
    alert("Please fill all fields correctly.");
    return;
  }
  if (this.selectedBudgetIndex !== null) {
      // Modifica
      this.budgets[this.selectedBudgetIndex] = { ...this.newBudget };
    } else {
      // Nuova creazione
      this.budgets.push({ ...this.newBudget, spent: 0 });
    }

  this.closeModal();
}

resetForm() {
  this.newBudget = {
    category: '',
    amount: 0,
    color: '',
    spent: 0
  };
}

get totalBudgeted() {
  return this.budgets.reduce((sum, b) => sum + b.amount, 0);
}

get totalSpent() {
  return this.budgets.reduce((sum, b) => sum + b.spent, 0);
}

get totalRemaining() {
  return this.totalBudgeted - this.totalSpent;
}

getRemaining(b: Budget): number {
  return b.amount - b.spent;
}

getPercentage(b: Budget): string {
  return ((b.spent / b.amount) * 100).toFixed(1) + '%';
}

openModalForEdit(b: Budget) {
  this.editMode = true;
  this.editingId = b.id!;
  this.selectedBudgetIndex = this.budgets.findIndex(p => p.id === b.id);  
  this.newBudget = {
    category: b.category,
    amount: b.amount,
    color: b.color,
    spent: b.spent
  };
  this.showModal = true;
}

deleteBudget(id: number) {
  this.budgets = this.budgets.filter(b => b.id !== id);
}

}
