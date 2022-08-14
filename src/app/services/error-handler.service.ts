import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES, TOKEN_STORAGE_KEY } from '../models/constants';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {
    errorMessage?: string;
    shouldRedirectToLogin = false;
    private readonly BAD_REQUEST = 400;
    private readonly UNAUTHORIZED = 401;
    private readonly FORBIDDEN = 403;
    private readonly UNAUTHORIZED_MESSAGE = 'Nem vagy bejelentkezve vagy lejárt a munkamenet. Jelentkezz be újra!';
    private readonly FORBIDDEN_MESSAGE = 'A kért oldal nem elérhető.';

    constructor(private readonly router: Router) {
    }

    handleHttpErrorResponse(error: HttpErrorResponse): void {
        const receivedErrorMessage = error.error?.message;
        if (this.UNAUTHORIZED === error.status && receivedErrorMessage || this.BAD_REQUEST === error.status) {
            this.shouldRedirectToLogin = false;
            this.errorMessage = receivedErrorMessage;
            return;
        }
        if (this.UNAUTHORIZED === error.status) {
            this.shouldRedirectToLogin = true;
            this.errorMessage = this.UNAUTHORIZED_MESSAGE;
            localStorage.removeItem(TOKEN_STORAGE_KEY);
        } else if (this.FORBIDDEN === error.status) {
            this.shouldRedirectToLogin = false;
            this.errorMessage = this.FORBIDDEN_MESSAGE;
        } else {
            this.shouldRedirectToLogin = false;
            this.errorMessage = receivedErrorMessage;
        }
        this.router.navigate([`/${ROUTES.ERROR}`]);
    }

}
