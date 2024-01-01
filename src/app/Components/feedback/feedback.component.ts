import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackServiceService } from '@app/_services/FeedbackService/feedback-service.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {

  userFeedback: string = '';
  isSaved:any = false;
  constructor (private feedbackService:FeedbackServiceService,private route:Router){};
  

  //this is for reloading component.
  reloadComponent() {
    this.route.navigateByUrl('/current-route', { skipLocationChange: true }).then(() => {
      this.route.navigate(['/current-route']);
    });
  }
  

  submitFeedback() {

    this.feedbackService.saveFeedback(this.userFeedback)
      .subscribe(
        response => {
          this.isSaved = true;
        },
        error => {

          console.error('Failed to upload the file:', error);
        }
      );

  }

  onReloadClick() {
    this.reloadComponent();
  }

  AllBlog(){
    this.route.navigate(['/home']);
  }

}
