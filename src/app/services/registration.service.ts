import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { API_PATHS } from '../models/constants';
import { Member } from '../models/interfaces';

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {
    private readonly url = `${environment.apiUrl}/${API_PATHS.REGISTRATION}`;

    constructor(private readonly http: HttpClient) {
    }

    registerNewMember(member: Partial<Member>): Observable<Member> {
        return this.http.post<Member>(this.url, member);
    }
}
