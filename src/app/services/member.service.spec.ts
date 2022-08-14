import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { API_PATHS } from '../models/constants';
import { testMember, testMembers } from '../test/test-util.spec';
import { MemberService } from './member.service';

describe('MemberService', () => {
    let httpTestingController: HttpTestingController;
    let service: MemberService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(MemberService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get the top leaderboard', () => {
        service.getTopLeaderBoard().subscribe(res => {
            expect(res).toEqual(testMembers());
        });

        const url = `${environment.apiUrl}/${API_PATHS.BASE.MEMBERS}/${API_PATHS.SEGMENTS.TOP_LEADERBOARD}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('GET');
        expect(req.request.body).toBeNull();

        req.flush(testMembers());
    });

    it('should get the full leaderboard', () => {
        service.getFullLeaderBoard().subscribe(res => {
            expect(res).toEqual(testMembers());
        });

        const url = `${environment.apiUrl}/${API_PATHS.BASE.MEMBERS}/${API_PATHS.SEGMENTS.FULL_LEADERBOARD}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('GET');
        expect(req.request.body).toBeNull();

        req.flush(testMembers());
    });

    it('should get the member by their id', () => {
        const memberId = 1;
        service.getMemberById(memberId).subscribe(res => {
            expect(res).toEqual(testMember());
        });

        const url = `${environment.apiUrl}/${API_PATHS.BASE.MEMBERS}/${memberId}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('GET');
        expect(req.request.body).toBeNull();

        req.flush(testMember());
    });

    it('should get the profile of the logged in member', () => {
        service.getLoggedInMemberProfile().subscribe(res => {
            expect(res).toEqual(testMember());
        });

        const url = `${environment.apiUrl}/${API_PATHS.BASE.MEMBERS}/${API_PATHS.SEGMENTS.LOGGED_IN}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('GET');
        expect(req.request.body).toBeNull();

        req.flush(testMember());
    });

    it('should update the profile of the logged in member', () => {
        service.updateLoggedInMemberProfile(testMember()).subscribe(res => {
            expect(res).toEqual(testMember());
        });

        const url = `${environment.apiUrl}/${API_PATHS.BASE.MEMBERS}/${API_PATHS.SEGMENTS.LOGGED_IN}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('PUT');
        expect(req.request.body).toEqual(testMember());

        req.flush(testMember());
    });

    it('should get all members for admin purposes', () => {
        service.getAllMembers().subscribe(res => {
            expect(res).toEqual(testMembers());
        });

        const url = `${environment.apiUrl}/${API_PATHS.BASE.MEMBERS}/${API_PATHS.SEGMENTS.ADMIN}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('GET');
        expect(req.request.body).toBeNull();

        req.flush(testMembers());
    });

    it('should update the given member', () => {
        const memberId = 1;
        service.updateMember(memberId, testMember()).subscribe(res => {
            expect(res).toEqual(testMember());
        });

        const url = `${environment.apiUrl}/${API_PATHS.BASE.MEMBERS}/${memberId}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('PUT');
        expect(req.request.body).toEqual(testMember());

        req.flush(testMember());
    });

    it('should delete the given member', () => {
        const memberId = 1;
        service.deleteMember(memberId).subscribe();

        const url = `${environment.apiUrl}/${API_PATHS.BASE.MEMBERS}/${memberId}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('DELETE');
        expect(req.request.body).toBeNull();

        req.flush(null);
    });
});
