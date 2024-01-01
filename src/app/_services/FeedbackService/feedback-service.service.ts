import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class FeedbackServiceService {

  constructor(private http: HttpClient) { }

  API_URL = 'https://abhishekprojectbackend-production.up.railway.app';

  saveFeedback(feedback: String) {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');


    return this.http.post(`${this.API_URL}/api/feedback/save?fdback=${feedback}` , { headers });
  
  }
}
