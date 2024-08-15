import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InrCurrencyPipe } from '../../pipes/inr-currency.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, FormsModule, InrCurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() imgUrl: string;
  @Input() productName: string;
  @Input() originalPrice: number;
  @Input() discountPrice: number;
  @Input() shopName: string;
  @Input() distance: string;
  @Input() address: string;
  @Input() productId: string;
  @Input() isLinear: boolean = true;
  productPercent: string;

  ngOnChanges() {
    this.productPercent = (((this.originalPrice - this.discountPrice) / this.originalPrice) * 100).toFixed(0);
  }

}
