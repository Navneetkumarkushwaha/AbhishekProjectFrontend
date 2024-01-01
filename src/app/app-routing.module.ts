import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { PdfsComponent } from './Components/Side-Navbar/pdfs/pdfs.component';
import { ClassesNotesComponent } from './Components/Side-Navbar/Classess-notes/classes-notes/classes-notes.component';
import { NotesComponent } from './Components/Side-Navbar/Classess-notes/Notes/notes/notes.component';
import { UploadPdfComponent } from './Components/Side-Navbar/Classess-notes/Notes/upload-pdf/upload-pdf/upload-pdf.component';
import { DownloadPdfComponent } from './Components/Side-Navbar/Classess-notes/Notes/Download-pdf/download-pdf/download-pdf.component';
import { CreateBlogComponent } from './Components/Blogs/create-blog/create-blog.component';
import { AllBlogsComponent } from './Components/Blogs/AllBlog/all-blogs/all-blogs.component';
import { FullBlogComponent } from './Components/Blogs/full-blog/full-blog.component';
import { UpdateBlogComponent } from './Components/Blogs/update-blog/update-blog.component';
import { FeedbackComponent } from './Components/feedback/feedback.component';
import { ForgotpassComponent} from './Components/forgotpass/forgotpass.component';
import { QuizComponent} from '@app/Components/quiz/quiz.component'


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'pdfs' , component: PdfsComponent},
  { path: 'classes-notes', component: ClassesNotesComponent},
  { path: 'notes' ,component:NotesComponent},
  { path : 'upload-pdf' , component:UploadPdfComponent},
  { path: 'download-pdf' , component:DownloadPdfComponent},
  { path : 'createBlog' , component:CreateBlogComponent},
  { path: 'allBlogs' , component : AllBlogsComponent},
  { path:'fullBlog' , component:FullBlogComponent},
  { path: 'updateBlog' , component:UpdateBlogComponent},
  { path: 'feedback' , component : FeedbackComponent},
  { path:'forpass' ,component:ForgotpassComponent},
  { path:'quiz' , component:QuizComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
