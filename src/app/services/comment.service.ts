import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { PuzzleComment } from '../models/PuzzleComment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl = 'https://puzzles-app.herokuapp.com/comments/';

  constructor(private http: HttpClient) {
  }

  getAllCommentsByPuzzle(puzzleId: number): Observable<PuzzleComment[]> {
    return this.http.get<PuzzleComment[]>(this.baseUrl + puzzleId);
  }

  getLatestCommentsByLoggedInMember(): Observable<PuzzleComment[]> {
    const url = this.baseUrl + 'logged-in-member';
    return this.http.get<PuzzleComment[]>(url);
  }

  getAllCommentsByMember(memberId: number): Observable<PuzzleComment[]> {
    if (!AuthService.isAdmin()) {
      return null;
    }

    const url = this.baseUrl + 'member/' + memberId;
    return this.http.get<PuzzleComment[]>(url);
  }

  addNewComment(newComment: PuzzleComment): Observable<PuzzleComment> {
    const url = this.baseUrl + 'add';
    return this.http.post<PuzzleComment>(url, newComment);
  }

  editComment(commentId: number, editedComment: PuzzleComment): Observable<PuzzleComment> {
    const url = this.baseUrl + 'update/' + commentId;
    return this.http.put<PuzzleComment>(url, editedComment);
  }

  deleteComment(commentId: number): Observable<any> {
    if (!AuthService.isAdmin()) {
      return null;
    }

    const url = this.baseUrl + 'delete/' + commentId;
    return this.http.delete(url);
  }
}
