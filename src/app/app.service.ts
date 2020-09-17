import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  baseUrl : string = null;
  photosData: Array<any> = [];
  constructor(private http: HttpClient) { 
    this.baseUrl = "http://jsonplaceholder.typicode.com/photos";
  }

  getPhotos(start, limit = null): Observable<any> {
    let url = `${this.baseUrl}?_start=${start}${limit ? `&_limit=${limit}` : ''}`
    return this.http.get(url)
                    .pipe(catchError(this.errorHandler));
  }

  getPhotosFromLS(start, limit) {
    let url = `${this.baseUrl}?_start=${start}&_limit=${limit}`
    return 
  }

  errorHandler(err: HttpErrorResponse) {
    return Observable.throw(err.message || "Something went wrong");
  }
}
