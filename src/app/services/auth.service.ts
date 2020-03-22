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
    const data = this.getTokenData();
    return data.indexOf('ADMIN') >= 0;
  }

  static getTokenData(): string {
    const token = localStorage.getItem('token');
    return token ? atob(token.substring(token.indexOf('.') + 1, token.lastIndexOf('.'))) : '';
  }

  login(data: { email: string, password: string }): Observable<any> {
    return this.http.post(this.url, data);
  }
}
