import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Member } from '../models/Member';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  url = 'https://puzzles-app.herokuapp.com/registration';

  constructor(private http: HttpClient) {
  }

  registerNewMember(member: Member): Observable<Member> {
    return this.http.post<Member>(this.url, member);
  }
}
