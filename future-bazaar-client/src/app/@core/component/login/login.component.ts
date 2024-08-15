import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
@Component({
  selector: 'login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  signUpForm!: FormGroup;
  showSignUpForm: boolean = false;
  authService = inject(AuthService);
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initiateLoginForm();
    this.initiateSignUpForm();
  }

  private initiateLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  private initiateSignUpForm() {
    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }
  
  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  signInWithEmailAndPassword() {
    const rawForm = this.loginForm.getRawValue();
    this.authService.login(rawForm.email, rawForm.password);
  }

  registerSeller() {
    const rawForm = this.signUpForm.getRawValue();
    this.authService.register(rawForm.email, rawForm.password).subscribe((userCred) => {
      this.authService.setUser(userCred);
    });
  }

  registerWithEmailAndPassword() {
    const rawForm = this.signUpForm.getRawValue();
    this.authService.register(rawForm.email, rawForm.password).subscribe((userCred) =>{
      console.log(userCred);
      this.authService.setUser(userCred);
      this.authService.addUser(
        {
          email: userCred.user.email, 
          firstName: rawForm.firstName, 
          lastName: rawForm.lastName
        });
    });
  }

  resetForm() {
    this.showSignUpForm = !this.showSignUpForm;
    this.loginForm.reset();
    this.signUpForm.reset();
  }

  logout() {
    this.authService.logout();
  }
}
