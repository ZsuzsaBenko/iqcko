import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TOKEN_STORAGE_KEY } from '../models/constants';
import { AuthInterceptor } from './auth-interceptor';

describe('AuthInterceptor', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let interceptor: AuthInterceptor;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                AuthInterceptor,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true
                }
            ]
        });
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
        interceptor = TestBed.inject(AuthInterceptor);
    });

    afterEach(() => {
        httpTestingController.verify();
        localStorage.clear();
    });

    it('should be created', () => {
        expect(interceptor).toBeTruthy();
    });

    it('should attach Authorization header to the request with the JWT token', () => {
        const url = '/test';
        const token = 'abcd1234';
        localStorage.setItem(TOKEN_STORAGE_KEY, token);

        httpClient.get(url).subscribe();

        const req = httpTestingController.expectOne(url);
        expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${token}`);

        req.flush({});
    });

    it('should not attach Authorization header to the request on login or registration', () => {
        const url = '/login';

        httpClient.get(url).subscribe();

        const req = httpTestingController.expectOne(url);
        expect(req.request.headers.get('Authorization')).toBeNull();

        req.flush({});
    });

});
