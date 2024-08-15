import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-bottom-sheet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent {
  
  constructor(
    private _authService: AuthService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>
  ) {
    console.log('Data received in bottom sheet:', data);
  }

  close(): void {
    // this.bottomSheetRef.dismiss('Some result'); // You can pass a result if needed
  }
  
  logout() {
    this._authService.logout();
  }
}
