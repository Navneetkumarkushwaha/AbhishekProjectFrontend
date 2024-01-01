import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '@app/_shared/shared/shared.service'

//const AUTH_API = 'https://abhishekprojectbackend-production.up.railway.app';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  constructor(private http: HttpClient, private shared: SharedService) { }

  private AUTH_API :any = this.shared.getAPI_URL();

  login(username: String, password: string): Observable<any> {
    return this.http.post(this.AUTH_API + '/api/auth/signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string, name: string): Observable<any> {

    console.log(username+' nameuser');
    console.log(name+'  name');
    console.log(password+'  pass');
    console.log(email+'  email');

    return this.http.post(
      this.AUTH_API + '/api/auth/signup',
      {
        username,
        name,
        email,
        password
      },
      httpOptions
    );
  }

  mailverification(email:string){
    return this.http.post(
      this.AUTH_API + '/api/auth/sendMail',
      {
        email
      },
      httpOptions
    );
  }

  checkmailexists(email:string){
    return this.http.post(
      this.AUTH_API + '/api/auth/checkmailexists',
      {
        email
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(this.AUTH_API + '/api/auth/signout', {}, httpOptions);
  }


  updatePass(email: string ,password: string) : Observable<any> {
    
    const formData: FormData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post(`${this.shared.getAPI_URL()}/api/auth/updatePass`, formData, { headers });
  
  }




}
