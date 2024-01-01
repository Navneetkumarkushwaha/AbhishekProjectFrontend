import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  //private API_URL:any = 'http://localhost:8080';
                          
  private API_URL:any ='https://abhishekprojectbackend-production.up.railway.app'

  private classNumber: any;

  private SubjectName : any;

  private id: any;

  private blog: any;




  setClassNumber(classNumber: any): void {
    this.classNumber = classNumber;
  }

  getClassNumber(): string {
    return this.classNumber;
  }

  setSubjectName(SubjectName:any):void {
    this.SubjectName = SubjectName;
  }

  getSubjectName() : any {
    return this.SubjectName;
  }


  setBlogId(id:any):void{
    this.id = id;
  }

  getBlogId():void{
    return this.id;
  }


  setBlog(blog:any):void{
      this.blog = blog;
  }

  getBlog():void{
      return this.blog;
  }

  getAPI_URL():any{
    return this.API_URL;
  }

}
