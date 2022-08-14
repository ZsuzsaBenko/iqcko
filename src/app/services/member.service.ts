import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { API_PATHS } from '../models/constants';
import { Member } from '../models/interfaces';

@Injectable({
    providedIn: 'root'
})
export class MemberService {
    private readonly baseUrl = `${environment.apiUrl}/${API_PATHS.BASE.MEMBERS}`;

    constructor(private readonly http: HttpClient) {
    }

    getTopLeaderBoard(): Observable<Array<Member>> {
        const url = `${this.baseUrl}/${API_PATHS.SEGMENTS.TOP_LEADERBOARD}`;
        return this.http.get<Array<Member>>(url);
    }

    getFullLeaderBoard(): Observable<Array<Member>> {
        const url = `${this.baseUrl}/${API_PATHS.SEGMENTS.FULL_LEADERBOARD}`;
        return this.http.get<Array<Member>>(url);
    }

    getLoggedInMemberProfile(): Observable<Member> {
        const url = `${this.baseUrl}/${API_PATHS.SEGMENTS.LOGGED_IN}`;
        return this.http.get<Member>(url);
    }

    getMemberById(id: number): Observable<Member> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get<Member>(url);
    }

    getAllMembers(): Observable<Array<Member>> {
        const url = `${this.baseUrl}/${API_PATHS.SEGMENTS.ADMIN}`;
        return this.http.get<Array<Member>>(url);
    }

    updateLoggedInMemberProfile(member: Member): Observable<Member> {
        const url = `${this.baseUrl}/${API_PATHS.SEGMENTS.LOGGED_IN}`;
        return this.http.put<Member>(url, member);
    }

    updateMember(id: number, member: Member): Observable<Member> {
        return this.http.put<Member>(`${this.baseUrl}/${id}`, member);
    }

    deleteMember(id: number): Observable<any>  {
       return this.http.delete(`${this.baseUrl}/${id}`);
    }
}
