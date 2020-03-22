import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { Puzzle } from '../models/Puzzle';
import { Category } from '../models/Category';
import { Level } from '../models/Level';

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {
  baseUrl = 'https://puzzles-app.herokuapp.com/puzzles/';


  constructor(private http: HttpClient) {
  }

  getAllPuzzles(): Observable<Puzzle[]> {
    const url = this.baseUrl + 'all';
    return this.http.get<Puzzle[]>(url);
  }

  getRandomPuzzles(): Observable<Puzzle[]> {
    const url = this.baseUrl + 'random';
    return this.http.get<Puzzle[]>(url);
  }

  getAllPuzzlesByLoggedInMember(): Observable<Puzzle[]> {
    const url = this.baseUrl + 'logged-in-member';
    return this.http.get<Puzzle[]>(url);
  }

  getAllPuzzlesByMember(memberId: number): Observable<Puzzle[]> {
    if (!AuthService.isAdmin()) {
      return null;
    }
    const url = this.baseUrl + 'member/' + memberId;
    return this.http.get<Puzzle[]>(url);
  }

  getPuzzlesByCategory(category: Category): Observable<Puzzle[]> {
    return this.http.get<Puzzle[]>(this.baseUrl + category.toString());
  }

  getSortedPuzzles(category: Category, sortingParam: string): Observable<Puzzle[]> {
    const url = this.baseUrl + 'sort/';
    if (!category) {
      return this.http.get<Puzzle[]>(url + sortingParam);
    } else {
      return this.http.get<Puzzle[]>(url + category + '/' + sortingParam);
    }
  }

  getPuzzleById(puzzleId: number): Observable<Puzzle> {
    const url = this.baseUrl + 'all/';
    return this.http.get<Puzzle>(url + puzzleId);
  }

  getPuzzleByIdForAdmin(puzzleId: number): Observable<Puzzle> {
    const url = this.baseUrl + 'all/' + puzzleId + '/admin';
    return this.http.get<Puzzle>(url);
  }

  addNewPuzzle(puzzle: Puzzle): Observable<Puzzle> {
    const url = this.baseUrl + 'add';
    return this.http.post<Puzzle>(url, puzzle);
  }

  updatePuzzle(puzzleId: number, updatePuzzle: Puzzle): Observable<Puzzle> {
    if (!AuthService.isAdmin()) {
      return null;
    }

    const url = this.baseUrl + 'update/' + puzzleId;
    return this.http.put<Puzzle>(url, updatePuzzle);
  }

  deletePuzzle(puzzleId: number): Observable<any> {
    if (!AuthService.isAdmin()) {
      return null;
    }

    const url = this.baseUrl + 'delete/' + puzzleId;
    return this.http.delete(url);
  }

  checkAnswer(puzzleId: number, answer: string): Observable<boolean> {
    const url = this.baseUrl + puzzleId + '/check';
    return this.http.post<boolean>(url, answer);
  }

  translateCategory(category: Category) {
    switch (category) {
      case Category.RIDDLE.toString():
        return 'fejtörő';
      case Category.MATH_PUZZLE.toString():
        return 'matematikai feladvány';
      case Category.WORD_PUZZLE.toString():
        return 'nyelvi játék';
      case Category.PICTURE_PUZZLE.toString():
        return 'képrejtvény';
      case Category.CIPHER.toString():
        return 'titkosírás';
    }
  }

  translateLevel(level: Level) {
    switch (level) {
      case Level.EASY.toString():
        return 'könnyű';
      case Level.MEDIUM.toString():
        return 'közepes';
      case Level.DIFFICULT.toString():
        return 'nehéz';
    }
  }
}
