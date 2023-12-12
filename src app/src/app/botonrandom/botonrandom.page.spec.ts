import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BotonrandomPage } from './botonrandom.page';

describe('QRPage', () => {
  let component: BotonrandomPage;
  let fixture: ComponentFixture<BotonrandomPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BotonrandomPage],
    }).compileComponents();

    fixture = TestBed.createComponent(BotonrandomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});