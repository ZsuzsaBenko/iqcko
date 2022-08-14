import { Category, Level } from './enums';

export interface Member {
    id: number;
    username: string;
    email?: string;
    password?: string;
    registration?: Date;
    score: number;
}

export interface Puzzle {
    id: number;
    category: Category;
    level: Level;
    title: string;
    instruction: string;
    puzzleItem: string;
    answer?: string;
    submissionTime: Date;
    rating: number;
    member: Member;
    solved: boolean;
}

export interface PuzzleComment {
    id: number;
    message: string;
    submissionTime: Date;
    puzzle: Puzzle;
    member: Member;
}

export interface Solution {
    id: number;
    rating: number;
    seconds: number;
    submissionTime: Date;
    member: Member;
    puzzle: Puzzle;
}
