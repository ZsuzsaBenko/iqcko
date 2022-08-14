import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TOKEN_STORAGE_KEY } from '../models/constants';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private readonly router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
        const token = localStorage.getItem(TOKEN_STORAGE_KEY);
        const jwtHelper = new JwtHelperService();

        if (null !== token && !jwtHelper.isTokenExpired(token)) {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }
}
