import { Component, OnInit } from '@angular/core';
import { BlogService } from '@app/_services/BlogService/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '@app/_shared/shared/shared.service';
import { StorageService } from '@app/_services/storage.service';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.css']
})
export class AllBlogsComponent implements OnInit {

  router: any;
  List: any;
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;


  constructor(
              private blogService: BlogService, 
              private route: Router, 
              private shared: SharedService, 
              private storageService: StorageService
              ) { }

  ngOnInit(): void {

    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      //console.log(this.showAdminBoard);

    }
    
    
    this.blogService.GetAllBlog().subscribe(
      response => {
        this.List = response;
        //console.log(this.List);
      },
      error => {
        console.error('Failed to upload the file:', error.text);
      }
    );
  }

  createNewBlog() {

    this.route.navigate(['/createBlog']);

  }

  setBlogId(id: any, blog: any) {

    this.shared.setBlogId(id);
    this.shared.setBlog(blog);
    this.route.navigate(['/fullBlog']);
  }

}
