import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProductSheetComponent } from './delete-product-sheet.component';

describe('DeleteProductSheetComponent', () => {
  let component: DeleteProductSheetComponent;
  let fixture: ComponentFixture<DeleteProductSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DeleteProductSheetComponent]
    });
    fixture = TestBed.createComponent(DeleteProductSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
