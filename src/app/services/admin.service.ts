import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../models/Member';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = 'https://puzzles-app.herokuapp.com';

  constructor(private http: HttpClient) { }

  getAllMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.baseUrl + '/members/all-members');
  }

  deleteMember(id: number): void {
    this.http.delete(this.baseUrl + '/members/delete/' + id);
  }
}
