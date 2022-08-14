import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ErrorHandlerService } from '../services/error-handler.service';
import { ErrorInterceptor } from './error-interceptor';
import SpyObj = jasmine.SpyObj;

describe('ErrorInterceptor', () => {
    let errorHandlerServiceSpy: SpyObj<ErrorHandlerService>;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let interceptor: ErrorInterceptor;

    beforeEach(() => {
        errorHandlerServiceSpy = jasmine.createSpyObj('ErrorHandlerService', ['handleHttpErrorResponse']);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                ErrorInterceptor,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: ErrorInterceptor,
                    multi: true
                },
                {
                    provide: ErrorHandlerService,
                    useValue: errorHandlerServiceSpy
                }
            ]
        });
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
        interceptor = TestBed.inject(ErrorInterceptor);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(interceptor).toBeTruthy();
    });

    it('should handle login/registration error response', (done: DoneFn) => {
        const url = '/login';
        const errorResponse = new HttpErrorResponse({url, status: 401, statusText: 'Unauthorized!'});

        httpClient.get(url).subscribe({
            error: () => done()
        });

        const req = httpTestingController.expectOne(url);
        req.flush(null, errorResponse);

        expect(errorHandlerServiceSpy.handleHttpErrorResponse).toHaveBeenCalledWith(errorResponse);
    });

    it('should handle error response', () => {
        const url = '/test';
        const errorResponse = new HttpErrorResponse({url, status: 401, statusText: 'Unauthorized!'});

        httpClient.get(url).subscribe();

        const req = httpTestingController.expectOne(url);
        req.flush(null, errorResponse);

        expect(errorHandlerServiceSpy.handleHttpErrorResponse).toHaveBeenCalledWith(errorResponse);
    });

});
