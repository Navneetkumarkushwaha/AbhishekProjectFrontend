import { Component, OnInit } from '@angular/core';

import { QuizserviceService } from '@app/_services/QuizService/quizservice.service';
import { StorageService } from '@app/_services/storage.service';
import { SharedService } from '@app/_shared/shared/shared.service'
import { Subscription } from 'rxjs';

interface OriginalQuestion {
  id: number;
  opt1: string;
  opt2: string;
  opt3: string;
  opt4: string;
  optAns: string;
  questionTitle: string;
  description: string;
}

interface ConvertedQuestion {
  questionText: string;
  options: { label: string; value: string }[];
  correctAnswer: string;
  description: string;
}

@Component({
  selector: 'app-showquizboard',
  templateUrl: './showquizboard.component.html',
  styleUrls: ['./showquizboard.component.css']
})
export class ShowquizboardComponent implements OnInit {

  userAnswers: { [key: string]: string } = {};
  showAnswers = false;
  showScore = false; // Added property
  chapter: string = '';
  chapterTitle: any;
  ischapterAndTitle: boolean = false;
  questionTitle: string = '';
  opt1: string = '';
  opt2: string = '';
  opt3: string = '';
  opt4: string = '';
  optAns: string = '';
  description: string = '';
  chapterNumber: string = '';
  classNumber: string = '';
  subject: string = '';
  questionsData: any;
  id: any;
  update: boolean = false;
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  selectedOption: string | null = null;
  showResult = false;
  isCorrect = false;
  selectedOptions: { [key: string]: string } = {}; // Map to store selected options for each question
  //correctAnswers: { [key: string]: string } = {}; // Map to store correct answers for each question
  quizForm: any;
  quizQuestions: any;
  chaptersData: any;

  private subscription: Subscription;


  constructor(private quizService: QuizserviceService,
    private storageService: StorageService,
    private sharedService: SharedService) {
      // Subscribe to the reload observable
      this.subscription = this.sharedService.reloadQuizshowboardComponent$.subscribe(() => {
        this.ngOnInit();
      });
    }

  ngOnInit() {
    this.classNumber = this.sharedService.getClassNumber();
    this.subject = this.sharedService.getSubjectName();
    this.chapter = this.sharedService.getChapter();
    this.chapterLoad();
    this.loadQuestions(this.classNumber, this.subject, this.chapter);
  }

  saveQuestion(): void {
    const questionData = {
      questionTitle: this.questionTitle,
      opt1: this.opt1,
      opt2: this.opt2,
      opt3: this.opt3,
      opt4: this.opt4,
      optAns: this.optAns,
      id: this.id,
      description: this.description,
      classNumber: this.classNumber,
      subject: this.subject,
      chapter: this.chapterNumber // to take input from user.
    };

    if (this.id) {

      this.quizService.updateQuestion(questionData).subscribe(
        () => {
          // Reload questions after update
          this.loadQuestions(this.classNumber, this.subject, this.chapter);
        },
        error => {
          if (error.status === 200) {
            this.update = false;
            alert('Updated successfully');
            this.loadQuestions(this.classNumber, this.subject, this.chapter);
            this.questionTitle = '';
            this.opt1 = '';
            this.opt2 = '';
            this.opt3 = '';
            this.opt4 = '';
            this.optAns = '';
            this.description = '';
            this.ngOnInit();
            if (questionData.id == this.id) {
              this.id = null;
            }
          }
          //console.error('Error updating question:', error);
        }
      );

    } else {
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
            this.description = '';
            this.chapterNumber = '';
            this.ngOnInit();

            // Optionally, reset the form fields or perform other actions.
          }
          // Handle error scenarios
        }
      );
    }

  }


  deleteQuestion(id: number): void {
    this.quizService.deleteQuestion(id, this.classNumber, this.subject).subscribe(
      () => {
        // Reload questions after deletion
        alert("Deleted successfully");
        this.loadQuestions(this.classNumber, this.subject, this.chapter);
        this.update = false;
        if (id == this.id) {
          this.id = null;
        }
      },
      error => {
        console.error('Error deleting question:', error);
      }
    );
  }

  updateQuestion(questionData: any): void {

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
    this.description = questionData.description;

  }


  loadQuestions(classNumber: string, subject: string, chapter: string): void {
    this.quizService.getAllQuestions(classNumber, subject, chapter).subscribe(
      questions => {
        this.questionsData = questions;
        //console.log(this.questionsData);
        const convertedquizQuestions: ConvertedQuestion[] = this.convertToNewFormat(this.questionsData);

        this.quizQuestions = convertedquizQuestions;
        //console.log(this.quizQuestions);


      },
      error => {
        console.error('Error fetching questions:', error);
      }
    );
  }


  convertToNewFormat(originalQuestions: OriginalQuestion[]): ConvertedQuestion[] {
    return originalQuestions.map((originalQuestion) => {

      const { id, opt1, opt2, opt3, opt4, optAns, questionTitle, description } = originalQuestion;

      const options = [
        { label: opt1, value: 'a' },
        { label: opt2, value: 'b' },
        { label: opt3, value: 'c' },
        { label: opt4, value: 'd' }, // Adjust as needed based on your options
      ];

      return {
        questionText: questionTitle,
        options,
        correctAnswer: optAns.toLowerCase(),
        description
      };
    });
  }


  chapterLoad(): void {

    this.quizService.getAllchapter(this.classNumber, this.subject).subscribe(
      chapters => {
        this.chaptersData = chapters;
        //console.log(this.chaptersData);
      },
      error => {
        console.error('Error fetching questions:', error);
      }
    );

  }

  setchapter(chapter: string, title: string): void {
    this.chapter = chapter;
    this.chapterTitle = title;
    this.ischapterAndTitle = true;
    this.loadQuestions(this.classNumber, this.subject, this.chapter);
  }

  reloadPage(): void {
    window.location.reload();
  }

  calculateScore(): number {
    let score = 0;
    this.quizQuestions.forEach((question: ConvertedQuestion, i: number) => {
      const userAnswer = this.userAnswers['q' + i];
      //console.log(question.correctAnswer);
      //console.log(userAnswer);
      if (userAnswer === question.correctAnswer) {
        console.log("hi")
        score++;
      }

    });

    return score;
  }

  submitQuiz() {
    //console.log('User Answers:', this.userAnswers);
    this.showAnswers = true;
    this.showScore = true; // Toggle to show score
  }






}
