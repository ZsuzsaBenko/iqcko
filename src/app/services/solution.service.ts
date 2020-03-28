import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { Solution } from '../models/Solution';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {
  baseUrl = 'https://puzzles-app.herokuapp.com/solutions/';

  constructor(private http: HttpClient) {
  }

  getAllSolutionsByLoggedInMember(): Observable<Solution[]> {
    const url = this.baseUrl + 'logged-in-member';
    return this.http.get<Solution[]>(url);
  }

  getAllSolutionsByMember(id: number): Observable<Solution[]> {
    if (!AuthService.isAdmin()) {
      return null;
    }

    const url = this.baseUrl + 'member/' + id;
    return this.http.get<Solution[]>(url);
  }


  saveSolution(solution: Solution): Observable<Solution> {
    const url = this.baseUrl + 'save';
    return this.http.post<Solution>(url, solution);
  }

  deleteSolution(solutionId): Observable<any> {
    if (!AuthService.isAdmin()) {
      return null;
    }
    const url = this.baseUrl + 'delete/' + solutionId;
    return this.http.delete(url);
  }
}
