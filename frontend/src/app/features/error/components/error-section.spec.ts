import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorSection } from './error-section';

describe('ErrorSection', () => {
  let component: ErrorSection;
  let fixture: ComponentFixture<ErrorSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
