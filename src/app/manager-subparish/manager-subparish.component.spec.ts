import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSubparishComponent } from './manager-subparish.component';

describe('ManagerSubparishComponent', () => {
  let component: ManagerSubparishComponent;
  let fixture: ComponentFixture<ManagerSubparishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerSubparishComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerSubparishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
