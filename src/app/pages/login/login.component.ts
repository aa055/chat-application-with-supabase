import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  // Getter methods for easy access to form controls
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  async handleAuth(){
    await this.authService.signInWithGoogle();
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      // console.log('Login data:', { email, password });
      
      try {
        // Call the auth service for email/password login
        await this.authService.signInWithEmailPassword(email, password);
        // Navigate to chat page after successful login
        // this.router.navigate(['/chat']);
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  }
}