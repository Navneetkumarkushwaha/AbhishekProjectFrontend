import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizserviceService {
   
  //private apiUrl = 'https://quizapplicationspringboot-production.up.railway.app/api/ques';
  private apiUrl:any = 'https://quizapplicationspringboot-production.up.railway.app/api/ques';
  constructor(private http: HttpClient) { }

  saveQuestion(questionData: any): Observable<any> {

    // console.log(questionData.questionTitle);
    // console.log(questionData.opt1);
    // console.log(questionData.opt2);
    // console.log(questionData.opt3);
    // console.log(questionData.opt4);
    // console.log(questionData.optAns);

    const saveQuestionUrl = `${this.apiUrl}/save-ques`; // Replace with your actual endpoint

    return this.http.post(saveQuestionUrl, questionData);
  }

  getAllQuestions(classNumber:string,subject:string,chapter:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getall-ques?classNumber=${classNumber}&subject=${subject}&chapter=${chapter}`);
  }

  deleteQuestion(id: number,classNumber:string,subject:string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteById?id=${id}&classNumber=${classNumber}&subject=${subject}`);
  }

  updateQuestion(question: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/updateById`, question);
  }

  getAllchapter(classNumber:String,subject:String):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Index?classNumber=${classNumber}&subject=${subject}`);
  }

}
