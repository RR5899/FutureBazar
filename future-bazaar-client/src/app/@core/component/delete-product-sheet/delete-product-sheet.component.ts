import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { DeleteProductService } from './delete-product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-product-sheet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-product-sheet.component.html',
  styleUrls: ['./delete-product-sheet.component.scss']
})
export class DeleteProductSheetComponent {
  constructor(
    private _router: Router,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { productId: string },
    private bottomSheetRef: MatBottomSheetRef<DeleteProductSheetComponent>,
    private _deleteProductService: DeleteProductService
  ) {
    console.log('Data received in bottom sheet:', data);
  }


  deleteProd() {
    this._deleteProductService.deleteProduct(this.data.productId).subscribe(res => {
      this._router.navigate(['seller-home']);
    });
  }

  close(): void {
    this.bottomSheetRef.dismiss('Deleted'); // You can pass a result if needed
  }
}
