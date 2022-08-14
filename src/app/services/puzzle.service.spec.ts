import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { API_PATHS } from '../models/constants';
import { Category } from '../models/enums';
import { testPuzzle, testPuzzles } from '../test/test-util.spec';
import { PuzzleService } from './puzzle.service';

describe('PuzzleService', () => {
    let httpTestingController: HttpTestingController;
    let service: PuzzleService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(PuzzleService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get all puzzles', () => {
        service.getAllPuzzles().subscribe(res => {
            expect(res).toEqual(testPuzzles());
        });

        const url = `${environment.apiUrl}/${API_PATHS.BASE.PUZZLES}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('GET');
        expect(req.request.body).toBeNull();

        req.flush(testPuzzles());
    });

    it('should get random puzzles', () => {
        service.getRandomPuzzles().subscribe(res => {
            expect(res).toEqual(testPuzzles());
        });

        const url = `${environment.apiUrl}/${API_PATHS.BASE.PUZZLES}/${API_PATHS.SEGMENTS.RANDOM}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('GET');
        expect(req.request.body).toBeNull();

        req.flush(testPuzzles());
    });

    it('should get puzzles by category', () => {
        const category = Category.WORD_PUZZLE;
        service.getPuzzlesByCategory(category).subscribe(res => {
            expect(res).toEqual(testPuzzles());
        });

        const url = `${environment.apiUrl}/${API_PATHS.BASE.PUZZLES}/${API_PATHS.SEGMENTS.CATEGORY}/${category.toString()}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('GET');
        expect(req.request.body).toBeNull();

        req.flush(testPuzzles());
    });

    it('should get sorted puzzles with category', () => {
        const category = Category.WORD_PUZZLE;
        const sortingParam = 'titleASC';

        service.getSortedPuzzles(category, sortingParam).subscribe(res => {
            expect(res).toEqual(testPuzzles());
        });

        const url = `${environment.apiUrl}/${API_PATHS.BASE.PUZZLES}/${API_PATHS.SEGMENTS.SORT}/${category}/${sortingParam}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('GET');
        expect(req.request.body).toBeNull();

        req.flush(testPuzzles());
    });

    it('should get sorted puzzles without category', () => {
        const sortingParam = 'titleASC';

        service.getSortedPuzzles(null, sortingParam).subscribe(res => {
            expect(res).toEqual(testPuzzles());
        });

        const url = `${environment.apiUrl}/${API_PATHS.BASE.PUZZLES}/${API_PATHS.SEGMENTS.SORT}/${sortingParam}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('GET');
        expect(req.request.body).toBeNull();

        req.flush(testPuzzles());
    });

    it('should get all puzzles of the logged-in member', () => {
        service.getAllPuzzlesByLoggedInMember().subscribe(res => {
            expect(res).toEqual(testPuzzles());
        });

        const url = `${environment.apiUrl}/${API_PATHS.BASE.PUZZLES}/${API_PATHS.SEGMENTS.MEMBER}/${API_PATHS.SEGMENTS.LOGGED_IN}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('GET');
        expect(req.request.body).toBeNull();

        req.flush(testPuzzles());
    });

    it('should get all puzzles of any given member', () => {
        const memberId = 1;
        service.getAllPuzzlesByMember(memberId).subscribe(res => {
            expect(res).toEqual(testPuzzles());
        });

        const url = `${environment.apiUrl}/${API_PATHS.BASE.PUZZLES}/${API_PATHS.SEGMENTS.MEMBER}/${memberId}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('GET');
        expect(req.request.body).toBeNull();

        req.flush(testPuzzles());
    });

    it('should get a puzzle by its id', () => {
        const puzzleId = 1;
        service.getPuzzleById(puzzleId).subscribe(res => {
            expect(res).toEqual(testPuzzle());
        });

        const url = `${environment.apiUrl}/${API_PATHS.BASE.PUZZLES}/${puzzleId}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('GET');
        expect(req.request.body).toBeNull();

        req.flush(testPuzzle());
    });

    it('should get a puzzle by its id for admin purposes', () => {
        const puzzleId = 1;
        service.getPuzzleByIdForAdmin(puzzleId).subscribe(res => {
            expect(res).toEqual(testPuzzle());
        });

        const url = `${environment.apiUrl}/${API_PATHS.BASE.PUZZLES}/${puzzleId}/${API_PATHS.SEGMENTS.ADMIN}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('GET');
        expect(req.request.body).toBeNull();

        req.flush(testPuzzle());
    });

    it('should check the answer for a puzzle', () => {
        const puzzleId = 1;
        const answer = 'It\'s the correct answer.';
        service.checkAnswer(puzzleId, answer).subscribe(res => {
            expect(res).toEqual(true);
        });

        const url = `${environment.apiUrl}/${API_PATHS.BASE.PUZZLES}/${puzzleId}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(answer);

        req.flush(true);
    });

    it('should add a new puzzle', () => {
        service.savePuzzle(testPuzzle()).subscribe(res => {
            expect(res).toEqual(testPuzzle());
        });

        const url = `${environment.apiUrl}/${API_PATHS.BASE.PUZZLES}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(testPuzzle());

        req.flush(testPuzzle());
    });

    it('should update a puzzle', () => {
        const puzzleId = 1;
        service.updatePuzzle(puzzleId, testPuzzle()).subscribe(res => {
            expect(res).toEqual(testPuzzle());
        });

        const url = `${environment.apiUrl}/${API_PATHS.BASE.PUZZLES}/${puzzleId}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('PUT');
        expect(req.request.body).toEqual(testPuzzle());

        req.flush(testPuzzle());
    });

    it('should delete a puzzle', () => {
        const puzzleId = 1;
        service.deletePuzzle(puzzleId).subscribe();

        const url = `${environment.apiUrl}/${API_PATHS.BASE.PUZZLES}/${puzzleId}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('DELETE');
        expect(req.request.body).toBeNull();

        req.flush(null);
    });

});
