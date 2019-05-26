import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientUploadsComponent } from './client-uploads.component';

describe('ClientUploadsComponent', () => {
  let component: ClientUploadsComponent;
  let fixture: ComponentFixture<ClientUploadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientUploadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientUploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
