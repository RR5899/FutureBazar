import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-seller-request',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-seller-request.component.html',
  styleUrls: ['./add-seller-request.component.scss']
})
export class AddSellerRequestComponent {

  addSellerForm: FormGroup;

  constructor(private fb: FormBuilder,) {

  }

  setForm() {
    this.addSellerForm = this.fb.group({
      shopName: ['', Validators.required],
      shopDescription: ['', Validators.required],
      category: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pinCode: ['', Validators.required],
    });
    console.log('setForm');    
  }
  
  onSubmit() {
    console.log('submitForm');
  }
  
  resetForm() {
    console.log('resetForm');
  }
}
