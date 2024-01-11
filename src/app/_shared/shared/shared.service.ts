import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  //private API_URL:any = 'http://localhost:8080';

  private API_URL: any = 'https://abhishekprojectbackend-production.up.railway.app'

  private classNumber: any;

  private SubjectName: any;

  private id: any;

  private blog: any;

  private chapter: any;

  private title: any;




  setClassNumber(classNumber: any): void {
    this.classNumber = classNumber;
  }

  getClassNumber(): string {
    return this.classNumber;
  }

  setSubjectName(SubjectName: any): void {
    this.SubjectName = SubjectName;
  }

  getSubjectName(): any {
    return this.SubjectName;
  }


  setBlogId(id: any): void {
    this.id = id;
  }

  getBlogId(): void {
    return this.id;
  }


  setBlog(blog: any): void {
    this.blog = blog;
  }

  getBlog(): void {
    return this.blog;
  }

  getAPI_URL(): any {
    return this.API_URL;
  }

  setChapter(chapter: string): void {
    this.chapter = chapter;
  }

  getChapter(): any {
    return this.chapter;
  }

  setChapterTitle(title: string): void {
    this.title = title;
  }

  getChapterTitle(): any {
    return this.title;
  }


  private reloadUploadPdfComponentSubject = new Subject<void>();
  private reloadDownloadPdfComponentSubject = new Subject<void>();
  private reloadQuizshowboardComponentSubject = new Subject<void>();

  // Observable that components can subscribe to for reload notifications
  reloadSecondComponent$ = this.reloadUploadPdfComponentSubject.asObservable();

  reloadDownloadPdfComponent$ = this.reloadDownloadPdfComponentSubject.asObservable();

  reloadQuizshowboardComponent$ = this.reloadQuizshowboardComponentSubject.asObservable();

  // Method to trigger the reload
  reloadUploadPdfComponent() {
    this.reloadUploadPdfComponentSubject.next();
  }

  reloadDownloadPdfComponent() {
    this.reloadDownloadPdfComponentSubject.next();
  }

  reloadQuizshowboardComponent(){
    this.reloadQuizshowboardComponentSubject.next();
  }

}
