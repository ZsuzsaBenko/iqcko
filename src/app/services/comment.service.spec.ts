import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { API_PATHS } from '../models/constants';
import { PuzzleComment } from '../models/interfaces';
import { testComment, testComments, testMember, testPuzzle } from '../test/test-util.spec';
import { CommentService } from './comment.service';

describe('CommentService', () => {
    let httpTestingController: HttpTestingController;
    let service: CommentService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(CommentService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get all comments belonging to a puzzle', () => {
        const puzzleId = 1;

        service.getAllCommentsByPuzzle(puzzleId).subscribe(res => {
            expect(res).toEqual(testComments());
        });

        const url = `${environment.apiUrl}/${API_PATHS.BASE.COMMENTS}/${API_PATHS.SEGMENTS.PUZZLE}/${puzzleId}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('GET');
        expect(req.request.body).toBeNull();

        req.flush(testComments());
    });

    it('should get comments of the logged in member', () => {
        service.getLatestCommentsByLoggedInMember().subscribe(res => {
            expect(res).toEqual(testComments());
        });

        const url = `${environment.apiUrl}/${API_PATHS.BASE.COMMENTS}/${API_PATHS.SEGMENTS.MEMBER}/${API_PATHS.SEGMENTS.LOGGED_IN}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('GET');
        expect(req.request.body).toBeNull();

        req.flush(testComments());
    });

    it('should get the comments of any member for admin purposes', () => {
        const memberId = 1;
        service.getAllCommentsByMember(memberId).subscribe(res => {
            expect(res).toEqual(testComments());
        });

        const url = `${environment.apiUrl}/${API_PATHS.BASE.COMMENTS}/${API_PATHS.SEGMENTS.MEMBER}/${memberId}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('GET');
        expect(req.request.body).toBeNull();

        req.flush(testComments());
    });

    it('should save a new comment', () => {
        const commentToSave = {
            message: 'New comment',
            puzzle: testPuzzle(),
            member: testMember()
        } as unknown as PuzzleComment;

        service.saveComment(commentToSave).subscribe(res => {
            expect(res).toEqual(testComment());
        });

        const url = `${environment.apiUrl}/${API_PATHS.BASE.COMMENTS}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(commentToSave);

        req.flush(testComment());
    });

    it('should update an edited comment', () => {
        const commentToUpdate = {
            id: 1,
            message: 'Edited comment'
        } as unknown as PuzzleComment;

        service.updateComment(commentToUpdate.id, commentToUpdate).subscribe(res => {
            expect(res).toEqual(testComment());
        });

        const url = `${environment.apiUrl}/${API_PATHS.BASE.COMMENTS}/${commentToUpdate.id}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('PUT');
        expect(req.request.body).toEqual(commentToUpdate);

        req.flush(testComment());
    });

    it('should delete a comment', () => {
        const commentId = 1;

        service.deleteComment(commentId).subscribe();

        const url = `${environment.apiUrl}/${API_PATHS.BASE.COMMENTS}/${commentId}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('DELETE');
        expect(req.request.body).toBeNull();

        req.flush(null);
    });

});
