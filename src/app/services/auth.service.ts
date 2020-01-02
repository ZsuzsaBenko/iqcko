import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'https://puzzles-app.herokuapp.com/login';

  constructor(private http: HttpClient) {
  }

  static isAdmin() {
    const token = localStorage.getItem('token');
    const data = atob(token.substring(token.indexOf('.') + 1, token.lastIndexOf('.')));
    return data.indexOf('ADMIN') >= 0;
  }

  login(data: {email: string, password: string}): Observable<any> {
    return this.http.post(this.url, data);
  }
}
