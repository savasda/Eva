import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PogramsComponent } from './pograms.component';

describe('PogramsComponent', () => {
  let component: PogramsComponent;
  let fixture: ComponentFixture<PogramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PogramsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PogramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
