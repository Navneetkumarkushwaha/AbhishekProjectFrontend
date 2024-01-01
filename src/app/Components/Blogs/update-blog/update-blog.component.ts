import { Component, OnInit } from '@angular/core';
import { SharedService } from '@app/_shared/shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '@app/_services/BlogService/blog.service';

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.css']
})
export class UpdateBlogComponent implements OnInit{
  
  constructor(private route: Router, private shared: SharedService,private blogService:BlogService) { }

 

  blog: any = {};

  ngOnInit(): void {
    this.blog = this.shared.getBlog(); 
  }

  onUpdate(){
    this.blogService.updateBlog(this.blog)
    .subscribe(
      response => {
        console.log('Blog uploaded successfully:', response);
        this.route.navigate(['/allBlogs']);
      },
      error => {
        this.route.navigate(['/allBlogs']);
        console.error('Failed to upload the file:', error);
      }
    );
  }

}
