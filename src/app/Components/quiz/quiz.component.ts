import { literalMap } from '@angular/compiler';
import { Component, OnInit,ViewChild } from '@angular/core';

import { QuizserviceService } from '@app/_services/QuizService/quizservice.service';
import { StorageService } from '@app/_services/storage.service';
import { SharedService } from '@app/_shared/shared/shared.service'

import { ShowquizboardComponent } from '@app/Components/quiz/showquizboard/showquizboard.component';

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
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

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
  classNumber: string = '6';
  subject: string = 'History';
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
  IsshowQuizBoard:boolean = false;

  constructor(private quizService: QuizserviceService,
    private storageService: StorageService,
    private sharedService: SharedService) { }



  ngOnInit(): void {

    this.isLoggedIn = this.storageService.isLoggedIn();
    

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    }
    this.sharedService.setClassNumber('6');
    this.sharedService.setSubjectName('History');
    this.sharedService.reloadQuizshowboardComponent();
    console.log("hi")
  }

 

  setClassNumberSubject(classNumber: string, subject: string) {
    this.classNumber = classNumber;
    this.subject = subject;
    this.sharedService.setClassNumber('6');
    this.sharedService.setSubjectName('History');
    this.IsshowQuizBoard = true;
    //this.sharedService.reloadQuizshowboardComponent();
    ///console.log("hl")
    //this.chapterLoad();
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

    this.questionTitle = questionData.questionTitle;
    this.opt1 = questionData.opt1;
    this.opt2 = questionData.opt2;
    this.opt3 = questionData.opt3;
    this.opt4 = questionData.opt4;
    this.optAns = questionData.optAns;
    this.id = questionData.id;
    this.description = questionData.description;

  }

  checkAnswer(questionId: string, selectedOption: string): void {
    if (!this.showResult) {
      this.selectedOptions[questionId] = selectedOption;
      this.showResult = true;
    }
  }

  userAnswers: { [key: string]: string } = {};
  showAnswers = false;
  showScore = false; // Added property



  submitQuiz() {
    //console.log('User Answers:', this.userAnswers);
    this.showAnswers = true;
    this.showScore = true; // Toggle to show score
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
    this.sharedService.setChapter(chapter);
    this.sharedService.setChapterTitle(title);
    this.ischapterAndTitle = true;
  }

  reloadPage(): void {
    window.location.reload();
  }

}




