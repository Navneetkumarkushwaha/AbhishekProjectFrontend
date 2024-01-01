import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { SharedService} from '@app/_shared/shared/shared.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    number : null,
    password: null
  };
  
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private storageService: StorageService,private route:Router ,private shared:SharedService) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      this.navigateToPdfs();
    }
  }

  onSubmit(): void {
    const { number , password } = this.form;

    this.authService.login(number, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.reloadPage();
           
      },
      error: err => {
        //this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
  
  navigateToPdfs():void{
    this.route.navigate(['/allBlogs']);
  }

  sayHello() {
    this.route.navigate(['/register']);
  }

  forpass(){
    this.route.navigate(['/forpass']);
  }
}
