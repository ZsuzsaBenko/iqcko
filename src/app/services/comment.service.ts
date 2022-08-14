import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { API_PATHS } from '../models/constants';
import { PuzzleComment } from '../models/interfaces';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    private readonly baseUrl = `${environment.apiUrl}/${API_PATHS.BASE.COMMENTS}`;

    constructor(private readonly http: HttpClient) {
    }

    getAllCommentsByPuzzle(puzzleId: number): Observable<Array<PuzzleComment>> {
        const url = `${this.baseUrl}/${API_PATHS.SEGMENTS.PUZZLE}/${puzzleId}`;
        return this.http.get<Array<PuzzleComment>>(url);
    }

    getLatestCommentsByLoggedInMember(): Observable<Array<PuzzleComment>> {
        const url = `${this.baseUrl}/${API_PATHS.SEGMENTS.MEMBER}/${API_PATHS.SEGMENTS.LOGGED_IN}`;
        return this.http.get<Array<PuzzleComment>>(url);
    }

    getAllCommentsByMember(memberId: number): Observable<Array<PuzzleComment>> {
        const url = `${this.baseUrl}/${API_PATHS.SEGMENTS.MEMBER}/${memberId}`;
        return this.http.get<Array<PuzzleComment>>(url);
    }

    saveComment(newComment: PuzzleComment): Observable<PuzzleComment> {
        return this.http.post<PuzzleComment>(this.baseUrl, newComment);
    }

    updateComment(commentId: number, editedComment: PuzzleComment): Observable<PuzzleComment> {
        return this.http.put<PuzzleComment>(`${this.baseUrl}/${commentId}`, editedComment);
    }

    deleteComment(commentId: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${commentId}`);
    }
}
