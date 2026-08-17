import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTransactions } from './get-transactions';

describe('GetTransactions', () => {
  let component: GetTransactions;
  let fixture: ComponentFixture<GetTransactions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetTransactions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetTransactions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
