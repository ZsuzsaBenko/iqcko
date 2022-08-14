import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_PATHS } from '../models/constants';
import { ErrorHandlerService } from '../services/error-handler.service';

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private readonly errorHandlerService: ErrorHandlerService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    this.errorHandlerService.handleHttpErrorResponse(error);
                    if (req.url.endsWith(API_PATHS.LOGIN) || req.url.endsWith(API_PATHS.REGISTRATION)) {
                        return throwError(() => error);
                    }
                    return EMPTY;
                })
            );
    }
}
