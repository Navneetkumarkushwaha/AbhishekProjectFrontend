import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-dowload-new-pdfcomponent',
  templateUrl: './dowload-new-pdfcomponent.component.html',
  styleUrls: ['./dowload-new-pdfcomponent.component.css']
})
export class DowloadNewPDFComponentComponent implements OnInit {
  loading: any;
  showAdminBoard: any;
  amount: number = 49;

  constructor(private sanitizer: DomSanitizer) {

  }
  ngOnInit(): void {

  }

  

}
