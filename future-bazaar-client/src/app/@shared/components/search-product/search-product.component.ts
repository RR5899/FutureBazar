import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'search-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent {
  searchText: string = '';
  constructor(private _router: Router) {

  }

  searchProduct() {
    const timer = setTimeout(() => {
      console.log(this.searchText);
      this._router.navigate(['products'], { queryParams: { search: this.searchText } })
    }, 800);
  }
}
