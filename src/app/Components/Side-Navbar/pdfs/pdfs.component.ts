import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '@shared/shared.service';

@Component({
  selector: 'app-pdfs',
  templateUrl: './pdfs.component.html',
  styleUrls: ['./pdfs.component.css']
})
export class PdfsComponent {

  constructor(private router: Router, private sharedService: SharedService) { }

  setClassNumberAndNavigate(classNumber: number,subject:string): void {
    // Set the class number in the shared service
    this.sharedService.setClassNumber(classNumber);
    this.sharedService.setSubjectName(subject);

    // Navigate to the 'classes-notes' route with the specified class number
    this.router.navigate(['/upload-pdf']);
  }
}
