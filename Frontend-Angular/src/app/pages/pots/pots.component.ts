import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pot } from '../../models/pot-model';
import { PotService } from '../../services/pots/pot.service';

@Component({
  selector: 'pots-page',
  imports: [FormsModule, CommonModule],
  templateUrl: './pots.component.html',
  styleUrl: './pots.component.scss'
})
export class PotsPage implements OnInit {
showModal = false;

editMode = false;
editingId: number | null = null;
selectedPotIndex: number | null = null;

pots: Pot[] = [
  {id: 1, targetAmount: 100, currentAmount: 30, color: '#13635b', name: 'Gift'},
  {id: 2, targetAmount: 1000,currentAmount: 500, color: '#78c4d4', name: 'Saving'},
]

newPot = {
  name: '',
  targetAmount: 0,
  currentAmount: 0,
  color: ''
};

themeColors = ['#2F8F9D', '#97C4D6', '#F2C57C', '#595260', '#D1493F', '#F29E4C', '#70AE6E', '#00BFFF'];

constructor(private potServices: PotService) {}
  
  ngOnInit(): void {
    this.potServices.getAll().subscribe(data => {
      this.pots = data;
    });
  }

get totalSaved() {
  return this.pots.reduce((sum, b) => sum + b.currentAmount, 0);
}

get totalTarget() {
  return this.pots.reduce((sum, b) => sum + b.targetAmount, 0);
}
openModal() {
  this.showModal = true;
}

closeModal() {
  this.showModal = false;
  this.resetForm();
}

selectColor(color: string) {
  this.newPot.color = color;
}

getRemaining(b: Pot): number {
  return b.targetAmount - b.currentAmount;
}

getPercentage(b: Pot): string {
  return ((b.currentAmount / b.targetAmount) * 100).toFixed(1) + '%';
}

createBudget() {
  if (!this.newPot.name || this.newPot.targetAmount <= 0 || !this.newPot.color) {
    alert("Please fill all fields correctly.");
    return;
  }
  if (this.selectedPotIndex !== null) {
      // Modifica
      this.pots[this.selectedPotIndex] = { ...this.newPot };
    } else {
      // Nuova creazione
      this.pots.push({ ...this.newPot});
    }

  this.closeModal();
}

resetForm() {
  this.newPot = {
    name: '',
    targetAmount: 0,
    currentAmount:0,
    color: ''
  };
}

openModalForEdit(pot: Pot) {
  this.editMode = true;
  this.editingId = pot.id!;
  this.selectedPotIndex = this.pots.findIndex(p => p.id === pot.id);  
  this.newPot = {
    name: pot.name,
    targetAmount: pot.targetAmount,
    currentAmount: pot.currentAmount,
    color:pot.color,
  };
  this.showModal = true;
}

deleteBudget(id: number) {
  this.pots = this.pots.filter(pot => pot.id !== id);
}


}
