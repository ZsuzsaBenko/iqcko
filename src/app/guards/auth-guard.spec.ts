import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { TOKEN_STORAGE_KEY } from '../models/constants';
import { AuthGuard } from './auth-guard';
import SpyObj = jasmine.SpyObj;

describe('AuthGuard', () => {
    let routerSpy: SpyObj<Router>;
    let authGuard: AuthGuard;

    beforeEach(() => {
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        TestBed.configureTestingModule({
            providers: [
                {provide: Router, useValue: routerSpy}
            ]
        });
        authGuard = TestBed.inject(AuthGuard);
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('should be created', () => {
        expect(authGuard).toBeTruthy();
    });

    it('should allow navigation to protected routes if the JWT token is valid', () => {
        localStorage.setItem(TOKEN_STORAGE_KEY, 'eyJhbGciOiJIUzI1NiJ9.' +
            'eyJzdWIiOiJhbm5hQGFubmEuaHUiLCJyb2xlcyI6WyJVU0VSIl0sImlhdCI6MTY1OTUxNTE3OSwiZXhwIjoyNTI0NjQxMTc5fQ.' +
            '4wRMBty4X5QJJwSQODBzlBFWlHOWR5Ov5sA2laUgsSc');

        expect(authGuard.canActivate({} as unknown as ActivatedRouteSnapshot, {} as unknown as RouterStateSnapshot)).toBeTrue();
    });

    it('should not allow navigation to protected routes if the JWT token has expired', () => {
        localStorage.setItem(TOKEN_STORAGE_KEY, 'eyJhbGciOiJIUzI1NiJ9.' +
            'eyJzdWIiOiJhbm5hQGFubmEuaHUiLCJyb2xlcyI6WyJVU0VSIl0sImlhdCI6MTY1OTUxNTE3OSwiZXhwIjoxNjU5ODE1MTc5fQ.' +
            'N5MsH5GBGnVyDxzy3SPmLIpZUzF3zPcja53PC5XiHAU');

        expect(authGuard.canActivate({} as unknown as ActivatedRouteSnapshot, {} as unknown as RouterStateSnapshot)).toBeFalse();
    });

    it('should not allow navigation to protected routes if there is no JWT token', () => {
        expect(authGuard.canActivate({} as unknown as ActivatedRouteSnapshot, {} as unknown as RouterStateSnapshot)).toBeFalse();
    });
});
