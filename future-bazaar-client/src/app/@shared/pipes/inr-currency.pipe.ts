import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inrCurrency',
  standalone: true
})
export class InrCurrencyPipe implements PipeTransform {

  transform(value: number): string {
    if (isNaN(value)) {
      return ''; // Handle non-numeric input
    }

    const absValue = Math.abs(value);
    if (absValue < 10000) {
      return this.formatThousands(value);
    } else if (absValue < 10000000) {
      return this.formatLakhs(value);
    } else {
      return this.formatCrores(value);
    }
  }

  private formatThousands(value: number): string {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  }

  private formatLakhs(value: number): string {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value / 100000) + ' Lakhs';
  }

  private formatCrores(value: number): string {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value / 10000000) + ' Cr';
  }
}
