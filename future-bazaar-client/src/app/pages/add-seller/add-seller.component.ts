import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-seller',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-seller.component.html',
  standalone: true,
  styleUrls: ['./add-seller.component.scss']
})
export class AddSellerComponent {
  shopForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.shopForm = this.fb.group({
      shopName: ['', Validators.required],
      ownerName: [''],
      gstNumber: ['', Validators.required],
      email: [''],
      location: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      shopPhoneNumber: ['', Validators.required],
      categories: ['', Validators.required],
      shopDescription: [''],
      shopPhoto: ['', Validators.required],
      shopTiming: [''],
    });
  }

  onSubmit() {
    if (this.shopForm.valid) {
      console.log(this.shopForm.value);
      // Submit the form data to your backend here
    }
  }
}
