import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TOKEN_STORAGE_KEY } from '../models/constants';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AdminAuthGuard implements CanActivateChild {

    constructor(private readonly router: Router) {
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = localStorage.getItem(TOKEN_STORAGE_KEY);
        const jwtHelper = new JwtHelperService();

        const canActivateRoute = null !== token && !jwtHelper.isTokenExpired(token) ? AuthService.isAdmin() : false;

        if (!canActivateRoute) {
            this.router.navigate(['/']);
        }
        return canActivateRoute;
    }
}
