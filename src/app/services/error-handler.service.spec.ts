import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ROUTES, TOKEN_STORAGE_KEY } from '../models/constants';
import { ErrorHandlerService } from './error-handler.service';
import SpyObj = jasmine.SpyObj;

describe('ErrorHandlerService', () => {
    let routerSpy: SpyObj<Router>;
    let service: ErrorHandlerService;

    beforeEach(() => {
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        TestBed.configureTestingModule({
            providers: [
                {provide: Router, useValue: routerSpy}
            ]
        });
        service = TestBed.inject(ErrorHandlerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should handle unauthorized error with received error message (unsuccessful login)', () => {
        const error: HttpErrorResponse = new HttpErrorResponse({status: 401, error: {message: 'Received error message'}});

        service.handleHttpErrorResponse(error);

        expect(service.errorMessage).toEqual('Received error message');
        expect(service.shouldRedirectToLogin).toBeFalse();
        expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('should handle unauthorized error without received error message', () => {
        const error: HttpErrorResponse = new HttpErrorResponse({status: 401});
        const storageSpy = spyOn(localStorage, 'removeItem');

        service.handleHttpErrorResponse(error);

        expect(service.errorMessage?.substring(0, 22)).toEqual('Nem vagy bejelentkezve');
        expect(service.shouldRedirectToLogin).toBeTrue();
        expect(storageSpy).toHaveBeenCalledWith(TOKEN_STORAGE_KEY);
        expect(routerSpy.navigate).toHaveBeenCalledWith([`/${ROUTES.ERROR}`]);
    });

    it('should handle bad request error (unsuccessful registration)', () => {
        const error: HttpErrorResponse = new HttpErrorResponse({status: 400, error: {message: 'Received error message'}});

        service.handleHttpErrorResponse(error);

        expect(service.errorMessage).toEqual('Received error message');
        expect(service.shouldRedirectToLogin).toBeFalse();
        expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('should handle forbidden error', () => {
        const error: HttpErrorResponse = new HttpErrorResponse({status: 403});

        service.handleHttpErrorResponse(error);

        expect(service.errorMessage).toEqual('A kért oldal nem elérhető.');
        expect(service.shouldRedirectToLogin).toBeFalse();
        expect(routerSpy.navigate).toHaveBeenCalledWith([`/${ROUTES.ERROR}`]);
    });

    it('should handle any other error', () => {
        const error: HttpErrorResponse = new HttpErrorResponse({status: 404, error: {message: 'Nem található.'}});

        service.handleHttpErrorResponse(error);

        expect(service.errorMessage).toEqual('Nem található.');
        expect(service.shouldRedirectToLogin).toBeFalse();
        expect(routerSpy.navigate).toHaveBeenCalledWith([`/${ROUTES.ERROR}`]);
    });

});
