import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizserviceService {

  private apiUrl = 'https://quizapplicationspringboot-production.up.railway.app/api/ques';
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

  getAllQuestions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getall-ques`);
  }

  deleteQuestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteById?id=${id}`);
  }

  updateQuestion(question: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/updateById`, question);
  }

}
