import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingView } from './onboarding-view';

describe('OnboardingView', () => {
  let component: OnboardingView;
  let fixture: ComponentFixture<OnboardingView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
