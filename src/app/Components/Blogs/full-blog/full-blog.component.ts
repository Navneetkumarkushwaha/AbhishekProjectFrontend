import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { BlogService } from '@app/_services/BlogService/blog.service';
import {  SharedService} from  '@app/_shared/shared/shared.service';
import { StorageService } from '@app/_services/storage.service'

@Component({
  selector: 'app-full-blog',
  templateUrl: './full-blog.component.html',
  styleUrls: ['./full-blog.component.css']
})
export class FullBlogComponent implements OnInit{
  
  blog: any;
  id : any;
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;

  constructor(private blogService: BlogService,
              private route:Router,
              private shared:SharedService,
              private storageService:StorageService) { }
  
  ngOnInit(): void {

    this.id = this.shared.getBlogId();

    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      //console.log(this.showAdminBoard);

    }


    this.blogService.getBlogById(this.id).subscribe(
      (blog) => {
        // Success: Handle the returned blog data here
        console.log('Retrieved blog:', blog);
        this.blog = blog; 
      },
      (error) => {
        // Error: Handle the error here
        console.error('Error fetching blog:', error);
      }
    );
    
  
  }

  DeleteBlog(){

    console.log(this.id);

    this.blogService.deleteBlogById(this.id).subscribe(
      (blog) => {
        // Success: Handle the returned blog data here
        
        alert('deleted Successfully');

        window.location.reload();

      },
      (error) => {
        // Error: Handle the error here
        console.error('Error deleteing blog:', error);
      }
    );

    
    this.route.navigate(['/allBlogs']);



  }

  UpdateBlog(){
    
    this.route.navigate(['/updateBlog']);
  }



}
