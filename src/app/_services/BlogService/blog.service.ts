import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  API_URL = 'https://abhishekprojectbackend-production.up.railway.app';

  saveBlog(Blog: any) {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    console.log(Blog);

    return this.http.post(`${this.API_URL}/api/blog/create`, Blog, { headers });
  }

  GetAllBlog() {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.get<any>(`${this.API_URL}/api/blog/GetAllBlogs`);

  }

  getBlogById(blogId: any) {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.get<any>(`${this.API_URL}/api/blog/getById?id=${blogId}`);

  }

  deleteBlogById(blogId: any) {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.delete<any>(`${this.API_URL}/api/blog/deleteById?id=${blogId}`);

  }

  updateBlog(Blog: any) {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.put(`${this.API_URL}/api/blog/updateById`, Blog, { headers });
    
  }


}
