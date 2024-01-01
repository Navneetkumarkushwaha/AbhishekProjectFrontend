import { Component, OnInit } from '@angular/core';
import { BlogService } from '@app/_services/BlogService/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '@app/_shared/shared/shared.service';
import { StorageService} from '@app/_services/storage.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {


  blog: any = {}; // Initialize an empty blog object
  id: any;

  constructor(private blogService: BlogService, private route: Router, private shared: SharedService) { }
  ngOnInit(): void {


    
  }

  onSubmit() {

    this.blogService.saveBlog(this.blog)
      .subscribe(
        response => {
          console.log('File uploaded successfully:', response);
          this.route.navigate(['/allBlogs']);
        },
        error => {
          this.route.navigate(['/allBlogs']);
          console.error('Failed to upload the file:', error);
        }
      );
  }

}
