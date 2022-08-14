import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { API_PATHS } from '../models/constants';
import { Member } from '../models/interfaces';
import { testMember } from '../test/test-util.spec';
import { RegistrationService } from './registration.service';

describe('RegistrationService', () => {
    let httpTestingController: HttpTestingController;
    let service: RegistrationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(RegistrationService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should register a new member', () => {
        const registrationData: Partial<Member> = {
            username: 'Username',
            password: 'password',
            email: 'email@email.hu'
        };

        service.registerNewMember(registrationData).subscribe(res => {
            expect(res).toEqual(testMember());
        });

        const url = `${environment.apiUrl}/${API_PATHS.REGISTRATION}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(registrationData);

        req.flush(testMember());
    });

});
