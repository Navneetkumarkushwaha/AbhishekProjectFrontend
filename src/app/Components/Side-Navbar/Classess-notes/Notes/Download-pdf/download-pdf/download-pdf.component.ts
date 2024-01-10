import { Component, OnInit } from '@angular/core';
import { SharedService } from '@shared/shared.service';
import { UploadPdfServiceService } from '@app/_services/Upload-Download/upload-pdf-service.service';
import { StorageService } from '@app/_services/storage.service'
import { PaymentSerService } from '@app/_services/PaymentService/payment-ser.service'
import { WindowRefService } from '@app/_services/WindowRef/window-ref.service'

declare var Razorpay: any;


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
    private paymentSerService: PaymentSerService,
    private winRef: WindowRefService) { }
   
  loading: boolean=true;
  amount:number = 49;
  classNumber: any = '';
  subject: any = '';
  List_PDF: any;
  showAdminBoard = false;
  isLoggedIn: any;
  private roles: string[] = [];
  isPaymentSuccessful: any = false;
  userId: string = '';
  pdfId: String = '';
  mobileNumber: any;
  email: any;
  studentName: any;
  paymentId: any;
  isPaymentHashmap: { [pdfId: string]: any } = {

  }
  

  ngOnInit(): void {

    setTimeout(() => {
      this.List_PDF = this.List_PDF;
      this.amount = this.amount;
      this.showAdminBoard = this.showAdminBoard;
      this.loading = false; // Set to false when data is loaded
    }, 4000); // Simulating a 4-second delay (replace with actual data fetching)

    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.userId = user.id;
      this.mobileNumber = user.username;
      this.email = user.email;
      this.studentName = user.name;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    }

    this.set_ClassNumber_Subject();
    this.api_call();
  }

  set_ClassNumber_Subject() {

    this.classNumber = this.sharedService.getClassNumber();
    this.subject = this.sharedService.getSubjectName();


  }


  api_call(): void {

    this.uploadPdfService.getPdf(this.classNumber, this.subject)
      .subscribe(
        response => {
          this.List_PDF = response;
          console.log(response)
          for (const pdf of response) {
            this.paymentSerService.ispaid(this.classNumber, this.subject, this.userId,pdf.id)
              .subscribe(
                response => {
                  this.isPaymentHashmap[pdf.id] = response;
                  this.loading = false;
                },
                error => {
                  console.error('Failed to get status of payment', error.status);
                }
              );


          }
        },
        error => {
          console.error('Failed to upload the file:', error);
        }
      );
  }

  download(id: any) {
    this.isPaymentSuccessful = this.isPaymentHashmap[id];
    if (!this.isLoggedIn) {
      alert('Login is required. Please Login first.');
    } else if (this.isPaymentSuccessful === 0) {
      alert('Payment is required. Please pay first.');
    } else {
      this.uploadPdfService.getPdfbyid(this.classNumber, this.subject, id)
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
      // alert('Downloaded successfully');
    }
  }

  deleteByid(id: any) {

    this.uploadPdfService.deletePdfById(this.classNumber, this.subject, id)
      .subscribe(
        Response => {
          this.api_call();
          alert("file deleted successully")
        },
        error => {
          alert("file deleted successully");
          this.api_call();
        }
      )

  }


  ispaymentDone(id: any) {
    // this.pdfId = id;
    // this.paymentSerService.ispaid(this.classNumber, this.subject, this.userId)
    //   .subscribe(
    //     response => {
    //       this.isPaymentSuccessful = response;
    //       console.log(response)
    //     },
    //     error => {
    //       console.error('Failed to get status of payment', error.status);
    //     }
    //   );
  }


  payNow(id: any) {
    this.pdfId = id;
    let options: any = {
      "key": 'rzp_test_P3jHndI0QZ9CEK',
      "amount": 100,
      "name": "Company Name",
      "description": "dummy data",
      "image": "./assets/images/logo.png",
      "modal": {
        "escape": false
      },
      "prefill": {
        name: this.studentName,
        email: this.email,
        phone: this.mobileNumber
      },
      "notes": {
        "address": ''
      },
      "theme": {
        "color": "#6fbc29"
      }
    };
    options.handler = ((response: { razorpay_payment_id: any; }) => {
      options['payment_response_id'] = response.razorpay_payment_id;
      this.paymentId = response.razorpay_payment_id;
      this.savepayment(this.pdfId);
    });
    options.modal.ondismiss = (() => {
      // this.loginService.SetLoader = false;
    });
    let rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }


  savepayment(id: any) {
    this.pdfId = id;
    this.paymentSerService.savepayment(this.userId, this.pdfId, this.classNumber, this.subject, this.mobileNumber, this.email, this.studentName, this.paymentId)
      .subscribe(
        response => {
          console.log('', response);
          this.reloadPage();
        },
        error => {
          if (error.status === 200) {
            this.isPaymentSuccessful = true;
            this.reloadPage();
          }
          console.error('Failed to save Data', error.status);
        }
      );


  }

  reloadPage(): void {
    window.location.reload();
  }




}
