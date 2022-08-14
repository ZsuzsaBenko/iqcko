import { ActivatedRoute } from '@angular/router';
import { Category, Level } from '../models/enums';
import { Member, Puzzle, PuzzleComment, Solution } from '../models/interfaces';

const members: Array<Member> = [
    {
        id: 1,
        username: 'UserName1',
        email: 'test@test.hu',
        password: 'test',
        registration: new Date(),
        score: 0
    },
    {
        id: 2,
        username: 'UserName2',
        email: 'test@test.hu',
        password: 'test',
        registration: new Date(),
        score: 12
    },
    {
        id: 2,
        username: 'UserName2',
        email: 'test@test.hu',
        password: 'test',
        registration: new Date(),
        score: 50
    }
];
export const testMembers: () => Array<Member> = () => [...members];
export const testMember: () => Member = () => ({...members[0]});

const puzzles: Array<Puzzle> = [
    {
        id: 1,
        category: Category.PICTURE_PUZZLE,
        level: Level.MEDIUM,
        title: 'Title',
        instruction: 'Instruction',
        puzzleItem: 'PuzzleItem',
        answer: 'Answer',
        submissionTime: new Date(),
        rating: 4.8,
        member: members[0],
        solved: false
    },
    {
        id: 2,
        category: Category.MATH_PUZZLE,
        level: Level.EASY,
        title: 'Title',
        instruction: 'Instruction',
        puzzleItem: 'PuzzleItem',
        answer: 'Answer',
        submissionTime: new Date(),
        rating: 5,
        member: members[0],
        solved: false
    },
    {
        id: 3,
        category: Category.WORD_PUZZLE,
        level: Level.DIFFICULT,
        title: 'Title',
        instruction: 'Instruction',
        puzzleItem: 'PuzzleItem',
        answer: 'Answer',
        submissionTime: new Date(),
        rating: 4.5,
        member: members[0],
        solved: false
    }
];
export const testPuzzles: () => Array<Puzzle> = () => [...puzzles];
export const testPuzzle: () => Puzzle = () => ({...puzzles[0]});

const solutions: Array<Solution> = [
    {
        id: 1,
        rating: 5,
        seconds: 132,
        submissionTime: new Date(),
        member: members[0],
        puzzle: puzzles[0]
    },
    {
        id: 2,
        rating: 4.5,
        seconds: 192,
        submissionTime: new Date(),
        member: members[1],
        puzzle: puzzles[0]
    },
    {
        id: 3,
        rating: 3.7,
        seconds: 253,
        submissionTime: new Date(),
        member: members[1],
        puzzle: puzzles[1]
    }
];
export const testSolutions: () => Array<Solution> = () => [...solutions];
export const testSolution: () => Solution = () => ({...solutions[0]});

const comments: Array<PuzzleComment> = [
    {
        id: 1,
        message: 'Comment1',
        submissionTime: new Date(),
        puzzle: puzzles[0],
        member: members[0]
    },
    {
        id: 2,
        message: 'Comment2',
        submissionTime: new Date(),
        puzzle: puzzles[0],
        member: members[0]
    },
    {
        id: 3,
        message: 'Comment3',
        submissionTime: new Date(),
        puzzle: puzzles[0],
        member: members[0]
    }
];
export const testComments: () => Array<PuzzleComment> = () => [...comments];
export const testComment: () => PuzzleComment = () => ({...comments[0]});

const activatedRoute = {
    snapshot: {
        params: {
            id: 1
        }
    }
};
export const activatedRouteMock: () => ActivatedRoute = () => ({...activatedRoute}) as unknown as ActivatedRoute;
