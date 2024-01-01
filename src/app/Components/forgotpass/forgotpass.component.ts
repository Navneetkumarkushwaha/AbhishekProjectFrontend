import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/_services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit{

    email: string = '';
    mail_otp:any;
    user_otp:any;
    otp_sent:any;
    otp_verified:boolean = false;
    password:any;
    con_password:any;

    constructor(private authService: AuthService, private Route: Router) { }

    ngOnInit(): void {
        
    }


    onSubmit(): void {
     // console.log(this.email)
      this.authService.checkmailexists(this.email).subscribe({
        next: data=>{
          if(data){
            //alert("Please Enter otp");
            this.sendOtp();     
          }else{
            alert("User not found please enter valid email.");
          }
        },
        error:() =>{
          console.log("error")
        }
      });
  
      
    }


    sendOtp(){
      this.authService.mailverification(this.email).subscribe({
        next: data => {
          this.mail_otp = data.toString();
          console.log(this.mail_otp);
          this.otp_sent = true;
        },
        error: () => {
          this.otp_sent = false;
        }
      });
    }

    verifyOtp(){
      if(this.mail_otp === this.user_otp){
        this.otp_verified = true;
      }
      else{
        alert('Enter valid OTP')
      }
    }

    updatepass(){
      
      if(this.password === this.con_password){
        this.authService.updatePass(this.email,this.password).subscribe({
          next: data => {
            alert('password updated successfully');
            this.Route.navigate(['/login']);
          },
          error: () => {
            console.log('error')
          }
        });
      }else{
        alert('enter same password');
      }
    }
  

}
