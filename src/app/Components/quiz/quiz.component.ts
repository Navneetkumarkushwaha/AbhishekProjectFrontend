import { Component, OnInit } from '@angular/core';

import { QuizserviceService } from '@app/_services/QuizService/quizservice.service';
import { StorageService} from '@app/_services/storage.service'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit{


  questionTitle: string = '';
  opt1: string = '';
  opt2: string = '';
  opt3: string = '';
  opt4: string = '';
  optAns: string = '';
  questionsData:any;
  id :any;
  update:boolean = false;
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;

  constructor(private quizService: QuizserviceService,private storageService:StorageService) { }

  ngOnInit(): void {

    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      //console.log(this.showAdminBoard);

    }
    
    this.loadQuestions();

  }

  loadQuestions(): void {
    this.quizService.getAllQuestions().subscribe(
      questions => {
        this.questionsData = questions;
      },
      error => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  saveQuestion(): void {
    const questionData = {
      questionTitle: this.questionTitle,
      opt1: this.opt1,
      opt2: this.opt2,
      opt3: this.opt3,
      opt4: this.opt4,
      optAns: this.optAns,
      id:this.id
    };

    if(this.id){

      this.quizService.updateQuestion(questionData).subscribe(
        () => {
          // Reload questions after update
          this.loadQuestions();
        },
        error => {
          if(error.status === 200){
            this.update = false;
            alert('Updated successfully');
            this.loadQuestions();
            this.questionTitle = '';
            this.opt1 = '';
            this.opt2 = '';
            this.opt3 = '';
            this.opt4 = '';
            this.optAns = '';
            this.ngOnInit();
            if(questionData.id == this.id){
              this.id = null;
            }
          }
          //console.error('Error updating question:', error);
        }
      );

    }else{
      this.quizService.saveQuestion(questionData).subscribe(
        response => {
  
        },
        error => {
          //console.error('Error saving question:', error.status);
          if (error.status === 201) {
            alert('saved successfully');
            this.questionTitle = '';
            this.opt1 = '';
            this.opt2 = '';
            this.opt3 = '';
            this.opt4 = '';
            this.optAns = '';
            this.ngOnInit();
            
            // Optionally, reset the form fields or perform other actions.
          }
          // Handle error scenarios
        }
      );
    }

  }

  deleteQuestion(id: number): void {
    this.quizService.deleteQuestion(id).subscribe(
      () => {
        // Reload questions after deletion
        this.loadQuestions();
        this.update = false;
        if(id == this.id){
          this.id = null;
        }
      },
      error => {
        console.error('Error deleting question:', error);
      }
    );
  }

  updateQuestion(questionData:any):void{
    
    this.update = true;

    // console.log(questionData.questionTitle);
    // console.log(questionData.opt1);
    // console.log(questionData.opt2);
    // console.log(questionData.opt3);
    // console.log(questionData.opt4);
    // console.log(questionData.optAns);

    this.questionTitle = questionData.questionTitle;
    this.opt1 = questionData.opt1;
    this.opt2 = questionData.opt2;
    this.opt3 = questionData.opt3;
    this.opt4 = questionData.opt4;
    this.optAns = questionData.optAns;
    this.id = questionData.id;

  }

}
