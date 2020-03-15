import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    let canActivateRoute = true;

    if (token != null) {
      canActivateRoute = AuthService.isAdmin();
    } else {
      canActivateRoute = false;
    }

    if (!canActivateRoute) {
      this.router.navigate(['']).then();
    }
    return canActivateRoute;
  }
}
