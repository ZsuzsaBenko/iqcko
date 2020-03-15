import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { Member } from '../models/Member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseUrl = 'https://puzzles-app.herokuapp.com/members/';


  constructor(private http: HttpClient) { }

  getTopLeaderBoard(): Observable<Member[]> {
    const url = this.baseUrl + 'top-leaderboard';
    return this.http.get<Member[]>(url);
  }

  getFullLeaderBoard(): Observable<Member[]> {
    const url = this.baseUrl + 'full-leaderboard';
    return this.http.get<Member[]>(url);
  }

  getAllMembers(): Observable<Member[]> {
    if (!AuthService.isAdmin()) {
      return null;
    }

    const url = this.baseUrl + 'all-members';
    return this.http.get<Member[]>(url);
  }

  getLoggedInMemberProfile(): Observable<Member> {
    const url = this.baseUrl + 'profile';
    return this.http.get<Member>(url);
  }

  updateLoggedInMemberProfile(member: Member): Observable<Member> {
    const url = this.baseUrl + 'profile/update';
    return this.http.put<Member>(url, member);
  }

  updateMember(id: number, member: Member): Observable<Member> {
    if (!AuthService.isAdmin()) {
      return null;
    }

    const url = this.baseUrl + 'update/' + id;
    return this.http.put<Member>(url, member);
  }

  deleteMember(id: number): Observable<any> {
    if (!AuthService.isAdmin()) {
      return null;
    }

    const url = this.baseUrl + 'delete/' + id;
    return this.http.delete(url);
  }
}
