import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentSerService {


  constructor(private http: HttpClient) { }


  savepayment(phoneNo: string, classNumber: string, userId: string, subject: string, paymentId: string, name: string): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('phoneNo', phoneNo);
    formData.append('classNumber', classNumber);
    formData.append('userId', userId);
    formData.append('subject', subject);
    formData.append('paymentId', paymentId);
    formData.append('name', name);

    const headers = new HttpHeaders();
    // Use set instead of append for HttpHeaders
    headers.set('Accept', 'application/json');

    return this.http.post(
      'http://localhost:8081/save',
      formData,
      { headers: headers }
    );
  }

  ispaid(classNumber:string,subject:string,userId:string){

    const headers = new HttpHeaders();
    headers.set('Accept', 'application/json');

    return this.http.get(`http://localhost:8081/ispaid?classNumber=${classNumber}&subject=${subject}&userId=${userId}`);

  }

}
