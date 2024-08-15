import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent {
  showAddProduct: boolean = false;
  constructor(private router: Router, private _authService: AuthService, 
  private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {
    this._authService.userSub.subscribe(res => {
      if (res) {
        this.showAddProduct = sessionStorage.getItem('roleName').toLowerCase() === 'test seller';
      }
    });
  }

  openLink(event: MouseEvent, route: string): void {
    event.preventDefault();
    this.router.navigate([route]);
  }

  logout(){
    this.openBottomSheet('yo');
  }

  openBottomSheet(data: any): void {
    const bottomSheetRef = this.bottomSheet?.open(BottomSheetComponent, {
      data: data
    });

    bottomSheetRef.afterDismissed().subscribe(result => {
      console.log('Bottom sheet dismissed with result:', result);
    });
  }
}