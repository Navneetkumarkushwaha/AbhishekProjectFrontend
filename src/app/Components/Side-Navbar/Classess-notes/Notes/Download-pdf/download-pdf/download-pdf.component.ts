import { Component, OnInit } from '@angular/core';
import { SharedService } from '@shared/shared.service';
import { UploadPdfServiceService } from '@app/_services/Upload-Download/upload-pdf-service.service';
import { StorageService } from '@app/_services/storage.service'
import { PaymentSerService} from '@app/_services/PaymentService/payment-ser.service'


@Component({
  selector: 'app-download-pdf',
  templateUrl: './download-pdf.component.html',
  styleUrls: ['./download-pdf.component.css']
})
export class DownloadPdfComponent implements OnInit {
  

  constructor(
    private uploadPdfService: UploadPdfServiceService,
    private sharedService: SharedService,
    private storageService: StorageService,
    private paymentSerService:PaymentSerService) { }

  ClassNumber: any = '';
  subject: any = '';
  List_PDF: any;
  showAdminBoard = false;
  isLoggedIn: any;
  private roles: string[] = [];
  isPaymentSuccessful:any = false;
  userId: string = ''; 

  ngOnInit(): void {

    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.userId = user.id;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    }

    this.set_ClassNumber_Subject();
    this.api_call()
    this.ispaymentDone();

  }

  set_ClassNumber_Subject() {

    this.ClassNumber = this.sharedService.getClassNumber();
    this.subject = this.sharedService.getSubjectName();


  }


  api_call(): void {

    this.uploadPdfService.getPdf(this.ClassNumber, this.subject)
      .subscribe(
        response => {
          this.List_PDF = response;
        },
        error => {
          console.error('Failed to upload the file:', error);
        }
      );
  }

  download(id: any) {
    if(!this.isLoggedIn){
      alert('Login is required. Please Login first.');
    }else if(!this.isPaymentSuccessful){
      alert('Payment is required. Please pay first.');
    }else{
      this.uploadPdfService.getPdfbyid(this.ClassNumber, this.subject, id)
      .subscribe(
        res => {
          let blob: Blob = res.body as Blob;
          const contentDispositionHeader = res.headers.get('Content-Disposition');
          const filenameMatch = contentDispositionHeader?.match(/filename="(.+?)"/);
          const filename = filenameMatch ? filenameMatch[1] : '';
          let url = window.URL.createObjectURL(blob);
    
          let a = document.createElement('a');
          a.download = filename;
          a.href = url;
          a.click();
    
        }  
      );

    }
  }

  deleteByid(id: any) {

    this.uploadPdfService.deletePdfById(this.ClassNumber, this.subject, id)
      .subscribe(
        Response => {

          this.api_call();
        },
        error => {

          this.api_call();
        }
      )

  }

  reloadPage(): void {
    window.location.reload();
  }


  ispaymentDone(){
    this.paymentSerService.ispaid(this.ClassNumber,this.subject,this.userId)
      .subscribe(
        response => {
          this.isPaymentSuccessful = response;
          console.log(response)
        },
        error => {
          console.error('Failed to get status of payment', error.status);
        }
      );
  }






}
