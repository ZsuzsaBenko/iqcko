import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { TOKEN_STORAGE_KEY } from '../models/constants';
import { AdminAuthGuard } from './admin-auth-guard';
import SpyObj = jasmine.SpyObj;

describe('AdminAuthGuard', () => {
    let routerSpy: SpyObj<Router>;
    let adminAuthGuard: AdminAuthGuard;

    beforeEach(() => {
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        TestBed.configureTestingModule({
            providers: [
                {provide: Router, useValue: routerSpy}
            ]
        });
        adminAuthGuard = TestBed.inject(AdminAuthGuard);
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('should be created', () => {
        expect(adminAuthGuard).toBeTruthy();
    });

    it('should allow navigation to protected routes if the JWT token has ADMIN role', () => {
        localStorage.setItem(TOKEN_STORAGE_KEY, 'eyJhbGciOiJIUzI1NiJ9.' +
            'eyJzdWIiOiJhbm5hQGFubmEuaHUiLCJyb2xlcyI6WyJBRE1JTiJdLCJpYXQiOjE2NTk1MTUxNzksImV4cCI6MjUyNDY0MTE3OX0.' +
            'MaHiDufoim_HH4iEbjZan93QCFQUSAyUxZjI2eA76Z0');

        expect(adminAuthGuard.canActivateChild({} as unknown as ActivatedRouteSnapshot, {} as unknown as RouterStateSnapshot)).toBeTrue();
    });

    it('should not allow navigation to protected routes if the JWT token does not have ADMIN role', () => {
        localStorage.setItem(TOKEN_STORAGE_KEY, 'eyJhbGciOiJIUzI1NiJ9.' +
            'eyJzdWIiOiJhbm5hQGFubmEuaHUiLCJyb2xlcyI6WyJVU0VSIl0sImlhdCI6MTY1OTUxNTE3OSwiZXhwIjoyNTI0NjQxMTc5fQ.' +
            '4wRMBty4X5QJJwSQODBzlBFWlHOWR5Ov5sA2laUgsSc');

        expect(adminAuthGuard.canActivateChild({} as unknown as ActivatedRouteSnapshot, {} as unknown as RouterStateSnapshot)).toBeFalse();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should not allow navigation to protected routes if there is no JWT token', () => {
        expect(adminAuthGuard.canActivateChild({} as unknown as ActivatedRouteSnapshot, {} as unknown as RouterStateSnapshot)).toBeFalse();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    });
});
