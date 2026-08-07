import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountView } from './create-account-view';

describe('CreateAccountView', () => {
  let component: CreateAccountView;
  let fixture: ComponentFixture<CreateAccountView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAccountView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAccountView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
