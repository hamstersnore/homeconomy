import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsView } from './accounts-view';

describe('AccountsView', () => {
  let component: AccountsView;
  let fixture: ComponentFixture<AccountsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountsView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountsView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
