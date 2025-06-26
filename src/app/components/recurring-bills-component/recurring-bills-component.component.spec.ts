import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringBillsComponentComponent } from './recurring-bills-component.component';

describe('RecurringBillsComponentComponent', () => {
  let component: RecurringBillsComponentComponent;
  let fixture: ComponentFixture<RecurringBillsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecurringBillsComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecurringBillsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
