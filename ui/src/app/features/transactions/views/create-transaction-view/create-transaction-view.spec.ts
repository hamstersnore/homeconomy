import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTransactionView } from './create-transaction-view';

describe('CreateTransaction', () => {
  let component: CreateTransactionView;
  let fixture: ComponentFixture<CreateTransactionView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTransactionView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTransactionView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
