import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerParishComponent } from './manager-parish.component';

describe('ManagerParishComponent', () => {
  let component: ManagerParishComponent;
  let fixture: ComponentFixture<ManagerParishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerParishComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerParishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
