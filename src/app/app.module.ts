import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { PdfsComponent } from './Components/Side-Navbar/pdfs/pdfs.component';
import { ClassesNotesComponent } from './Components/Side-Navbar/Classess-notes/classes-notes/classes-notes.component';
import { NotesComponent } from './Components/Side-Navbar/Classess-notes/Notes/notes/notes.component';
import { SubjectPdfComponent } from './Components/Side-Navbar/Subject/subject-pdf/subject-pdf.component';
import { UploadPdfComponent } from './Components/Side-Navbar/Classess-notes/Notes/upload-pdf/upload-pdf/upload-pdf.component';
import { DownloadPdfComponent } from './Components/Side-Navbar/Classess-notes/Notes/Download-pdf/download-pdf/download-pdf.component';
import { AllBlogsComponent } from './Components/Blogs/AllBlog/all-blogs/all-blogs.component';
import { CreateBlogComponent } from './Components/Blogs/create-blog/create-blog.component';
import { FullBlogComponent } from './Components/Blogs/full-blog/full-blog.component';
import { UpdateBlogComponent } from './Components/Blogs/update-blog/update-blog.component';
import { FeedbackComponent } from './Components/feedback/feedback.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './Components/footer/footer.component';
import { ForgotpassComponent } from './Components/forgotpass/forgotpass.component';
import { QuizComponent } from './Components/quiz/quiz.component';
import { RefundpolicyComponent } from './Components/Policies/refundpolicy/refundpolicy.component';
import { PrivacyPolicyComponent } from './Components/Policies/privacy-policy/privacy-policy.component';
import { TermsAndServicesComponent } from './Components/Policies/terms-and-services/terms-and-services.component';
import { ContactUsComponent } from './Components/Policies/contact-us/contact-us.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    PdfsComponent,
    ClassesNotesComponent,
    NotesComponent,
    SubjectPdfComponent,
    UploadPdfComponent,
    DownloadPdfComponent,
    AllBlogsComponent,
    CreateBlogComponent,
    FullBlogComponent,
    UpdateBlogComponent,
    FeedbackComponent,
    FooterComponent,
    ForgotpassComponent,
    QuizComponent,
    RefundpolicyComponent,
    PrivacyPolicyComponent,
    TermsAndServicesComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
