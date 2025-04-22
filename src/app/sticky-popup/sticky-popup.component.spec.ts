import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyPopupComponent } from './sticky-popup.component';

describe('StickyPopupComponent', () => {
  let component: StickyPopupComponent;
  let fixture: ComponentFixture<StickyPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StickyPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
