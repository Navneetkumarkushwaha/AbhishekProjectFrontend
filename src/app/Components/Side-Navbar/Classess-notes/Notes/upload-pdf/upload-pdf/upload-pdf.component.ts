import { Component, OnInit } from '@angular/core';
import { UploadPdfServiceService } from '@app/_services/Upload-Download/upload-pdf-service.service';
import { SharedService } from '@shared/shared.service';
import { StorageService } from '@app/_services/storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-upload-pdf',
  templateUrl: './upload-pdf.component.html',
  styleUrls: ['./upload-pdf.component.css']
})
export class UploadPdfComponent implements OnInit {

  name: any = '';
  filename: any = '';
  file: any;
  classNumber: string = this.sharedService.getClassNumber();
  topic: string = '';
  subject: string = this.sharedService.getSubjectName();  // Add subject property

  showUpladBoard: any;
  roles: any;
  submitted: any = false;
  private subscription: Subscription;

  constructor(private uploadPdfService: UploadPdfServiceService, 
              private sharedService: SharedService, 
              private storageService: StorageService,
              private sanitizer: DomSanitizer)  {
    // Subscribe to the reload observable
    this.subscription = this.sharedService.reloadSecondComponent$.subscribe(() => {
      this.reloadComponent();
    });
  }

  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.submitted = false;
  }

  getTrustedHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  ngOnInit(): void {

    const user = this.storageService.getUser();
    this.roles = user.roles;
    this.showUpladBoard = this.roles.includes('ROLE_ADMIN');

    if(!this.sharedService.getClassNumber()){
      this.classNumber = '6';
    }
    else{
      this.classNumber = this.sharedService.getClassNumber();
    }

    if(!this.sharedService.getSubjectName()){
      this.subject = 'History';
    }else{
      this.subject = this.sharedService.getSubjectName();
    }

  }

  onUpload() {
    if (this.selectedFile) {

      if (!this.classNumber) {
        alert("choose class number");
      } else if (!this.topic) {
        alert("write topic in topic field");
      } else if (!this.subject) {
        alert("choose subject ");
      } else if (!this.selectedFile) {
        alert("select a new file.");
      } else {

        this.uploadPdfService.uploadFile(this.selectedFile, this.classNumber, this.topic, this.subject, this.filename)
          .subscribe(
            response => {
              console.log('Server response:', response);
            },
            error => {

              if (error) {
                const textResponse = error.error.text;
                if (textResponse.includes('File uploaded successfully')) {
                  this.submitted = true;
                  this.topic = '';
                  this.selectedFile = null;
                  alert('File uploaded successfully');
                } else {
                  console.error('Unexpected response:', textResponse);
                }
              } else {
                console.error('Unexpected status:', error.response.status);
              }
            }

          );
      } 

    }else {
      alert('No file selected.');
    }


  }

  checkCharacterLimit() {
    if (this.topic.length > 1000) {
      this.topic = this.trimToWordLimit(this.topic, 1000);// Trim to 700 characters
    }
  }

  getWordCount(text: string): number {
    // Simple logic to count words
    const words = text.split(/\s+/);
    return words.length;
  }

  trimToWordLimit(text: string, limit: number): string {
    const words = text.split(/\s+/);
    return words.slice(0, limit).join(' ');
  }

  reloadComponent() {
    // Implement the logic to reload or refresh your component here
    this.classNumber=this.sharedService.getClassNumber();
    this.subject= this.sharedService.getSubjectName();
    this.sharedService.reloadDownloadPdfComponent();
  }
}
