import { Component } from '@angular/core';
import { SharedService } from '@shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {

  SubjectName : any;
  constructor(private route: ActivatedRoute, private router: Router,private sharedService: SharedService) { }

  navigateToNotes(SubjectName : any): void {

    this.sharedService.setSubjectName(SubjectName);

    this.router.navigate(['/upload-pdf']);

  }

}
