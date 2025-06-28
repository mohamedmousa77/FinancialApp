import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceService } from '../../services/finance.service';

@Component({
  selector: 'menu-customized-component',
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})

export class MenuComponent {
navItems = [
  { label: 'Overview', icon: 'fas fa-home', active: true },
  { label: 'Transactions', icon: 'fas fa-random me-2', active: false },
  { label: 'Budgets', icon: 'fas fa-wallet', active: false },
  { label: 'Pots', icon: 'fas fa-box', active: false },
  { label: 'Recurring Bills', icon: 'fas fa-receipt', active: false },
];

constructor(private financeService :FinanceService) {}

swithPage(pageIndex: number) {
  console.log("page index"+ pageIndex);
  this.financeService.switchPage(pageIndex);
  this.navItems.forEach(element => { element.active = false});
  this.navItems[pageIndex].active = true;
}

}
