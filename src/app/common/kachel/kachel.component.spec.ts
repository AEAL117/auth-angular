import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KachelComponent } from './kachel.component';

describe('KachelComponent', () => {
  let component: KachelComponent;
  let fixture: ComponentFixture<KachelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KachelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KachelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
