import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayoOMenorComponent } from './mayo-omenor.component';

describe('MayoOMenorComponent', () => {
  let component: MayoOMenorComponent;
  let fixture: ComponentFixture<MayoOMenorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MayoOMenorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MayoOMenorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
