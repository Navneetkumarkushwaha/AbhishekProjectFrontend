import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedService } from '@app/_shared/shared/shared.service';
import { Observable } from 'rxjs';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class UploadPdfServiceService {

  constructor(private http: HttpClient , private shared:SharedService) { }

  //API_URL = 'https://abhishekprojectbackend-production.up.railway.app';


  uploadFile(file: File, classNumber: string, topic: string, subject: string,filename:string): Observable<any> {
    
    const formData: FormData = new FormData();
    
    formData.append('file', file, file.name);
    formData.append('classNumber', classNumber);
    formData.append('topic', topic);
    formData.append('subject', subject);
    formData.append('filename',filename);
    
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post(`${this.shared.getAPI_URL()}/api/pdf/upload`, formData, { headers });
  }


  getPdf(classNumber: string ,subject: string) {
    
    const formData: FormData = new FormData();
    formData.append('classNumber', classNumber);
    formData.append('subject', subject);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.get<any>(`${this.shared.getAPI_URL()}/api/pdf/GetPdf?classNumber=${classNumber}&subject=${subject}`);
  
  }

  getPdfbyid(classNumber:string,subject:string,Id:string){

    return this.http.get(`${this.shared.getAPI_URL()}/api/pdf/GetPdfById?classNumber=${classNumber}&subject=${subject}&Id=${Id}`,{observe:'response',responseType:'blob'});
  
  }

  deletePdfById(classNumber: string, subject: string, id: string): Observable<any> {
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  
    const options = { headers: headers };
  
    return this.http.delete<any>(`${this.shared.getAPI_URL()}/api/pdf/DeletePdfById?classNumber=${classNumber}&subject=${subject}&Id=${id}`, options);
  }
  



}
