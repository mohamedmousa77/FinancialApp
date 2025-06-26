import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsComponentComponent } from './transactions-component.component';

describe('TransactionsComponentComponent', () => {
  let component: TransactionsComponentComponent;
  let fixture: ComponentFixture<TransactionsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
