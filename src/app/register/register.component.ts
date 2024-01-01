import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {
    username: null,
    email: null,
    password: null,
    name: null
  };

  otp: any;
  otp_usr: any;
  otp_sent = false;

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  otp_veified = false;

  constructor(private authService: AuthService, private Route: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {

    this.mailVerification()
  }

  mailVerification() {

    const { email } = this.form;

    this.authService.mailverification(email).subscribe({
      next: data => {
        this.otp = data.toString();
        this.otp_sent = true;
      },
      error: () => {
        this.isSignUpFailed = true;
      }
    });

  }
  sayHello() {
    this.Route.navigate(['/login']);
  }

  verify(): any {
    if (this.otp_usr === this.otp) {
      this.otp_veified = true
      const { username, email, password, name } = this.form;

    this.authService.register(username, email, password, name).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        //this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
    } else {
      // The entered OTP is not six digits
      this.otp_veified = false;
    }
  }


}
