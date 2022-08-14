import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { API_PATHS } from '../models/constants';
import { Solution } from '../models/interfaces';

@Injectable({
    providedIn: 'root'
})
export class SolutionService {
    private readonly baseUrl = `${environment.apiUrl}/${API_PATHS.BASE.SOLUTIONS}`;

    constructor(private readonly http: HttpClient) {
    }

    getAllSolutionsByLoggedInMember(): Observable<Array<Solution>> {
        const url = `${this.baseUrl}/${API_PATHS.SEGMENTS.MEMBER}/${API_PATHS.SEGMENTS.LOGGED_IN}`;
        return this.http.get<Array<Solution>>(url);
    }

    getAllSolutionsByMember(id: number): Observable<Array<Solution>> {
        const url = `${this.baseUrl }/${API_PATHS.SEGMENTS.MEMBER}/${id}`;
        return this.http.get<Array<Solution>>(url);
    }

    saveSolution(solution: Solution): Observable<Solution> {
        return this.http.post<Solution>(this.baseUrl, solution);
    }

    deleteSolution(solutionId: number): Observable<any> {
        const url = `${this.baseUrl}/${solutionId}`;
        return this.http.delete(url);
    }
}
