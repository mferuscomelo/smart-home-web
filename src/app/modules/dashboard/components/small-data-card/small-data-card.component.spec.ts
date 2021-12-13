import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallDataCardComponent } from './small-data-card.component';

describe('SmallDataCardComponent', () => {
  let component: SmallDataCardComponent;
  let fixture: ComponentFixture<SmallDataCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallDataCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallDataCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
