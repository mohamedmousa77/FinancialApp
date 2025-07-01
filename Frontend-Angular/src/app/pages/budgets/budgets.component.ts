import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Budget } from '../../models/budget-model';
import { BudgetServices } from '../../services/budgets/budget-services.service';

@Component({
  selector: 'budgets-page',
  imports: [CommonModule,FormsModule],
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.scss'
})

export class BudgetsPage implements OnInit {
editMode = false;
editingId: number | null = null;
selectedBudgetIndex: number | null = null;
showModal = false;


budgets: Budget[] = [];

newBudget = {
  category: '',
  amount: 0,
  color: '',
  spent: 0,
};

themeColors = ['#2F8F9D', '#97C4D6', '#F2C57C', '#595260', '#D1493F', '#F29E4C', '#70AE6E', '#00BFFF'];

constructor(private budgetSetvices : BudgetServices) { }

  ngOnInit(): void {
    this.budgetSetvices.getAll().subscribe(data => {
      this.budgets = data;
    });

  }

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
      const updatedBudget = { ...this.newBudget, id: this.editingId! };
      this.budgetSetvices.update(updatedBudget).subscribe(() => {
        if (this.selectedBudgetIndex !== null) {
          this.budgets[this.selectedBudgetIndex] = updatedBudget;
        }
        this.closeModal();
      });
    } else {
      // Nuova creazione
      this.budgetSetvices.create({ ...this.newBudget, spent: 0 })
      .subscribe(createdBudget => {
        this.budgets.push(createdBudget);
        this.closeModal();
      });
    }

  this.closeModal();
}

deleteBudget(id: number) {
  if (confirm('Are you sure you want to delete this budget?')) {
    this.budgetSetvices.delete(id).subscribe(() => {
      this.budgets = this.budgets.filter(b => b.id !== id);
    });
  }
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

}
