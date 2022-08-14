import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { API_PATHS, TOKEN_STORAGE_KEY } from '../models/constants';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let httpTestingController: HttpTestingController;
    let service: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(AuthService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should log the user in', () => {
        const loginData: { email: string; password: string } = {
            email: 'email@email.hu',
            password: 'password'
        };
        const response = {token: 'JWT token'};

        service.login(loginData).subscribe(res => {
            expect(res).toEqual(response);
        });

        const url = `${environment.apiUrl}/${API_PATHS.LOGIN}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(loginData);

        req.flush(response);
    });

    it('should check whether the logged-in member has ADMIN role', () => {
        // admin
        localStorage.setItem(TOKEN_STORAGE_KEY,
            'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbm5hQGFubmEuaHUiLCJyb2xlcyI6WyJBRE1JTiJdLCJpYXQiOjE2NTk1MTUxNzksImV4cCI6MjUyNDY0MTE3OX0' +
            '.MaHiDufoim_HH4iEbjZan93QCFQUSAyUxZjI2eA76Z0');

        expect(AuthService.isAdmin()).toBeTrue();

        // not admin
        localStorage.setItem(TOKEN_STORAGE_KEY,
            'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbm5hQGFubmEuaHUiLCJyb2xlcyI6WyJVU0VSIl0sImlhdCI6MTY1OTUxNTE3OSwiZXhwIjoyNTI0NjQxMTc5fQ' +
            '.4wRMBty4X5QJJwSQODBzlBFWlHOWR5Ov5sA2laUgsSc');

        expect(AuthService.isAdmin()).toBeFalse();

        localStorage.clear();
    });

});
