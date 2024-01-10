import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SharedService } from '@shared/shared.service';
import { StorageService } from '@app/_services/storage.service'
import { PaymentSerService } from '@app/_services/PaymentService/payment-ser.service'
import  {WindowRefService} from '@app/_services/WindowRef/window-ref.service'

declare var Razorpay: any;

@Component({
  selector: 'app-classes-notes',
  templateUrl: './classes-notes.component.html',
  styleUrls: ['./classes-notes.component.css']
})
export class ClassesNotesComponent implements OnInit {

  classNumber: any;
  SubjectName: any;
  studentName: any;
  userId: any;
  phoneNo: any;
  currentUser: any;
  email: any;
  paymentId: any;
  payment_success: any  = false;
  roles: any;
  showUpladBoard : any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService,
    private storageService: StorageService,
    private paymentSerService: PaymentSerService,
    private winRef: WindowRefService) { }


  ngOnInit(): void {

    if (this.sharedService.getClassNumber()) {
      this.classNumber = this.sharedService.getClassNumber();
    }

    if (this.sharedService.getSubjectName()) {
      this.SubjectName = this.sharedService.getSubjectName();
    }

    this.currentUser = this.storageService.getUser();
    this.userId = this.currentUser.id;
    this.phoneNo = this.currentUser.username;
    this.email = this.currentUser.email;
    this.studentName = this.currentUser.name;

    const user = this.storageService.getUser();
    this.roles = user.roles;
    if(user.username){
      this.showUpladBoard = this.roles.includes('ROLE_ADMIN');
    }
  
    

    // this.paymentSerService.ispaid(this.classNumber,this.SubjectName,this.userId)
    //   .subscribe(
    //     response => {
    //       this.payment_success = response;
    //     },
    //     error => {
    //       console.error('Failed to get status of payment', error.status);
    //     }
    //   );
    



  }

  navigateToNotes(): void {
    this.classNumber = this.sharedService.getClassNumber();
    this.router.navigate(['/notes']);
  }


  payNow() {

    let options:any = {
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
        phone: this.phoneNo      },
      "notes": {
        "address":''
      },
      "theme": {
        "color": "#6fbc29"
      }
    };
    options.handler = ((response: { razorpay_payment_id: any; }) => {
        options['payment_response_id'] = response.razorpay_payment_id;
        this.paymentId = response.razorpay_payment_id;
        this.savepayment();
    });
    options.modal.ondismiss = (() => {
       // this.loginService.SetLoader = false;
    });
    let rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
}  

  

  savepayment() {
    // this.paymentSerService.savepayment(this.phoneNo, this.classNumber, this.userId, this.SubjectName, this.paymentId, this.studentName)
    //   .subscribe(
    //     response => {
    //       console.log('', response);
    //       this.reloadPage();
    //     },
    //     error => {
    //       if(error.status === 200){
    //         this.payment_success = true;
    //         this.reloadPage();
    //       }
    //       console.error('Failed to save Data', error.status);
    //     }
    //   );
  }

  reloadPage(): void {
    window.location.reload();
  }

}

