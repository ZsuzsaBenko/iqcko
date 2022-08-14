import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_PATHS, TOKEN_STORAGE_KEY } from '../models/constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.endsWith(API_PATHS.REGISTRATION) && !req.url.endsWith(API_PATHS.LOGIN)) {
            const modifiedReq = req.clone({
                headers: req.headers
                    .append('Authorization', `Bearer ${localStorage.getItem(TOKEN_STORAGE_KEY)}`)
            });
            return next.handle(modifiedReq);
        }
        return next.handle(req);
    }
}
