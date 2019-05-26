import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpgpanelComponent } from './opgpanel.component';

describe('OpgpanelComponent', () => {
  let component: OpgpanelComponent;
  let fixture: ComponentFixture<OpgpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpgpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpgpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
