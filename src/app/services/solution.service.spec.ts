import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { API_PATHS } from '../models/constants';
import { Solution } from '../models/interfaces';
import { testSolution, testSolutions } from '../test/test-util.spec';
import { SolutionService } from './solution.service';

describe('SolutionService', () => {
    let httpTestingController: HttpTestingController;
    let service: SolutionService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(SolutionService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get all solutions by the logged-in member', () => {
        service.getAllSolutionsByLoggedInMember().subscribe(res => {
            expect(res).toEqual(testSolutions());
        });

        const url = `${environment.apiUrl}/${API_PATHS.BASE.SOLUTIONS}/${API_PATHS.SEGMENTS.MEMBER}/${API_PATHS.SEGMENTS.LOGGED_IN}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('GET');
        expect(req.request.body).toBeNull();

        req.flush(testSolutions());
    });

    it('should get all solutions by any given member', () => {
        const memberId = 1;
        service.getAllSolutionsByMember(memberId).subscribe(res => {
            expect(res).toEqual(testSolutions());
        });

        const url = `${environment.apiUrl}/${API_PATHS.BASE.SOLUTIONS}/${API_PATHS.SEGMENTS.MEMBER}/${memberId}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('GET');
        expect(req.request.body).toBeNull();

        req.flush(testSolutions());
    });

    it('should save a solution', () => {
        const solutionToSave = {seconds: 20, rating: 5} as unknown as Solution;
        service.saveSolution(solutionToSave).subscribe(res => {
            expect(res).toEqual(testSolution());
        });

        const url = `${environment.apiUrl}/${API_PATHS.BASE.SOLUTIONS}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(solutionToSave);

        req.flush(testSolution());
    });

    it('should delete a solution', () => {
        const solutionId = 1;
        service.deleteSolution(solutionId).subscribe();

        const url = `${environment.apiUrl}/${API_PATHS.BASE.SOLUTIONS}/${solutionId}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('DELETE');
        expect(req.request.body).toBeNull();

        req.flush(null);
    });
});
