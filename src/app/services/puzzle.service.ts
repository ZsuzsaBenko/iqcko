import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { API_PATHS } from '../models/constants';
import { Category } from '../models/enums';
import { Puzzle } from '../models/interfaces';

@Injectable({
    providedIn: 'root'
})
export class PuzzleService {
    private readonly baseUrl = `${environment.apiUrl}/${API_PATHS.BASE.PUZZLES}`;

    constructor(private readonly http: HttpClient) {
    }

    getAllPuzzles(): Observable<Array<Puzzle>> {
        return this.http.get<Array<Puzzle>>(this.baseUrl);
    }

    getRandomPuzzles(): Observable<Array<Puzzle>> {
        const url = `${this.baseUrl}/${API_PATHS.SEGMENTS.RANDOM}`;
        return this.http.get<Array<Puzzle>>(url);
    }

    getPuzzlesByCategory(category: Category): Observable<Array<Puzzle>> {
        const url = `${this.baseUrl}/${API_PATHS.SEGMENTS.CATEGORY}/${category.toString()}`;
        return this.http.get<Array<Puzzle>>(url);
    }

    getSortedPuzzles(category: Category | null, sortingParam: string): Observable<Array<Puzzle>> {
        const url = `${this.baseUrl}/${API_PATHS.SEGMENTS.SORT}`;
        if (!category) {
            return this.http.get<Array<Puzzle>>(`${url}/${sortingParam}`);
        }
        return this.http.get<Array<Puzzle>>(`${url}/${category}/${sortingParam}`);
    }

    getAllPuzzlesByLoggedInMember(): Observable<Array<Puzzle>> {
        const url = `${this.baseUrl}/${API_PATHS.SEGMENTS.MEMBER}/${API_PATHS.SEGMENTS.LOGGED_IN}`;
        return this.http.get<Array<Puzzle>>(url);
    }

    getAllPuzzlesByMember(memberId: number): Observable<Array<Puzzle>> {
        const url = `${this.baseUrl}/${API_PATHS.SEGMENTS.MEMBER}/${memberId}`;
        return this.http.get<Array<Puzzle>>(url);
    }

    getPuzzleById(puzzleId: number): Observable<Puzzle> {
        return this.http.get<Puzzle>(`${this.baseUrl}/${puzzleId}`);
    }

    getPuzzleByIdForAdmin(puzzleId: number): Observable<Puzzle> {
        const url = `${this.baseUrl}/${puzzleId}/${API_PATHS.SEGMENTS.ADMIN}`;
        return this.http.get<Puzzle>(url);
    }

    checkAnswer(puzzleId: number, answer: string): Observable<boolean> {
        return this.http.post<boolean>(`${this.baseUrl}/${puzzleId}`, answer);
    }

    savePuzzle(puzzle: Puzzle): Observable<Puzzle> {
        return this.http.post<Puzzle>(this.baseUrl, puzzle);
    }

    updatePuzzle(puzzleId: number, updatedPuzzle: Puzzle): Observable<Puzzle> {
        return this.http.put<Puzzle>(`${this.baseUrl}/${puzzleId}`, updatedPuzzle);
    }

    deletePuzzle(puzzleId: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${puzzleId}`);
    }
}
