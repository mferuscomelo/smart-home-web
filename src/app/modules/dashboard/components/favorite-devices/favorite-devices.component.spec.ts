import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteDevicesComponent } from './favorite-devices.component';

describe('FavoriteDevicesComponent', () => {
  let component: FavoriteDevicesComponent;
  let fixture: ComponentFixture<FavoriteDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteDevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
