import { Component, OnInit } from '@angular/core';
import { UploadPdfServiceService } from '@app/_services/Upload-Download/upload-pdf-service.service';
import { SharedService } from '@shared/shared.service';
import { StorageService } from '@app/_services/storage.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-upload-pdf',
  templateUrl: './upload-pdf.component.html',
  styleUrls: ['./upload-pdf.component.css']
})
export class UploadPdfComponent implements OnInit {

  name: any = '';
  filename : any = '';
  file: any;
  classNumber: string = this.sharedService.getClassNumber();
  topic: string = '';
  subject: string = this.sharedService.getSubjectName();  // Add subject property

  showUpladBoard: any;
  roles: any;
  submitted :  any = false;

  constructor(private uploadPdfService: UploadPdfServiceService, private sharedService: SharedService, private storageService: StorageService) { }

  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.submitted = false;
  }

  ngOnInit(): void {
    
    const user = this.storageService.getUser();
    this.roles = user.roles;
    this.showUpladBoard = this.roles.includes('ROLE_ADMIN');

  }

    onUpload() {
      if (this.selectedFile) {

        this.uploadPdfService.uploadFile(this.selectedFile, this.classNumber, this.topic, this.subject,this.filename)
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
                } else {
                  console.error('Unexpected response:', textResponse);
                }
              } else {
                console.error('Unexpected status:', error.response.status);
              }
            }

          );
      } else {
        console.warn('No file selected.');
      }
    }
  }