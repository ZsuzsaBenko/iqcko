import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ROUTES, TOKEN_STORAGE_KEY } from '../../../../models/constants';
import { AuthService } from '../../../../services/auth.service';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { RegistrationService } from '../../../../services/registration.service';
import { testMember } from '../../../../test/test-util.spec';
import { RegLoginComponent } from './reg-login.component';
import SpyObj = jasmine.SpyObj;

describe('RegLoginComponent', () => {
    let registrationServiceSpy: SpyObj<RegistrationService>;
    let authServiceSpy: SpyObj<AuthService>;
    let errorHandlerServiceSpy: SpyObj<ErrorHandlerService>;
    let routerSpy: SpyObj<Router>;
    let component: RegLoginComponent;
    let fixture: ComponentFixture<RegLoginComponent>;

    beforeEach(async () => {
        registrationServiceSpy = jasmine.createSpyObj('RegistrationService', ['registerNewMember']);
        authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
        errorHandlerServiceSpy = jasmine.createSpyObj('ErrorHandlerService', ['']);
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            declarations: [RegLoginComponent],
            imports: [FormsModule],
            providers: [
                {provide: RegistrationService, useValue: registrationServiceSpy},
                {provide: AuthService, useValue: authServiceSpy},
                {provide: ErrorHandlerService, useValue: errorHandlerServiceSpy},
                {provide: Router, useValue: routerSpy}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(RegLoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize properties', () => {
        expect(component.form).toBeTruthy();
        expect(component.isLogin).toBeTrue();
        expect(component.submitted).toBeFalse();
        expect(component.errorMessage).toBeFalsy();
        expect(component.registrationSuccessMessage).toBeFalsy();
    });

    it('should show login form and reset form and errorMessage', () => {
        component.isLogin = false;
        component.form.setValue({username: null, email: 'test@test.hu', password: 'password'});
        component.errorMessage = 'error';

        component.showLoginForm();

        expect(component.isLogin).toBeTrue();
        expect(component.form.value.email).toBeNull();
        expect(component.errorMessage).toBeFalsy();
    });

    it('should show registration form and reset form and errorMessage', () => {
        component.isLogin = true;
        component.form.setValue({username: null, email: 'test@test.hu', password: 'password'});
        component.errorMessage = 'error';

        component.showRegistrationForm();

        expect(component.isLogin).toBeFalse();
        expect(component.form.value.email).toBeNull();
        expect(component.errorMessage).toBeFalsy();
    });

    it('should not submit login data if the form is invalid', () => {
        component.isLogin = true;
        component.form.setValue({username: null, email: '', password: 'password'});

        component.onSubmit();

        expect(authServiceSpy.login).not.toHaveBeenCalled();
    });

    it('should not submit registration data if the form is invalid', () => {
        component.isLogin = false;
        component.form.setValue({username: null, email: '', password: 'password'});

        component.onSubmit();

        expect(registrationServiceSpy.registerNewMember).not.toHaveBeenCalled();
    });

    it('should submit login data and handle success response', () => {
        authServiceSpy.login.and.returnValue(of({token: 'JWT token'}));
        component.isLogin = true;
        component.form.setValue({username: null, email: 'test@test.hu', password: 'password'});
        const storageSpy = spyOn(localStorage, 'setItem');

        component.onSubmit();

        expect(authServiceSpy.login).toHaveBeenCalledWith({email: 'test@test.hu', password: 'password'});
        expect(component.form.value.email).toBeFalsy();
        expect(component.form.value.password).toBeFalsy();
        expect(storageSpy).toHaveBeenCalledWith(TOKEN_STORAGE_KEY, 'JWT token');
        expect(routerSpy.navigate).toHaveBeenCalledWith([`/${ROUTES.HOME}`]);
    });

    it('should submit login data and handle error response', () => {
        authServiceSpy.login.and.returnValue(throwError(() => new HttpErrorResponse({})));
        errorHandlerServiceSpy.errorMessage = 'Error message';
        component.isLogin = true;
        component.form.setValue({username: null, email: 'test@test.hu', password: 'password'});

        component.onSubmit();

        expect(authServiceSpy.login).toHaveBeenCalledWith({email: 'test@test.hu', password: 'password'});
        expect(component.form.value.email).toBeNull();
        expect(component.form.value.password).toBeNull();
        expect(component.errorMessage).toEqual('Error message');
    });

    it('should submit registration data and handle success response', () => {
        registrationServiceSpy.registerNewMember.and.returnValue(of(testMember()));
        component.isLogin = false;
        component.form.setValue({username: 'Username', email: 'test@test.hu', password: 'password'});

        component.onSubmit();

        expect(registrationServiceSpy.registerNewMember).toHaveBeenCalledWith(
            {username: 'Username', email: 'test@test.hu', password: 'password'});
        expect(component.form.value.username).toBeNull();
        expect(component.form.value.email).toBeNull();
        expect(component.form.value.password).toBeNull();
        expect(component.registrationSuccessMessage).toBeTruthy();
        expect(component.isLogin).toBeTrue();
    });

    it('should submit registration data and handle error response', () => {
        registrationServiceSpy.registerNewMember.and.returnValue(throwError(() => new HttpErrorResponse({})));
        errorHandlerServiceSpy.errorMessage = 'Error message';
        component.isLogin = false;
        component.form.setValue({username: 'Username', email: 'test@test.hu', password: 'password'});

        component.onSubmit();

        expect(registrationServiceSpy.registerNewMember).toHaveBeenCalledWith(
            {username: 'Username', email: 'test@test.hu', password: 'password'});
        expect(component.errorMessage).toBeTruthy();
        expect(component.registrationSuccessMessage).toBeFalsy();
        expect(component.form.value.username).toBeNull();
        expect(component.form.value.email).toBeNull();
        expect(component.form.value.password).toBeNull();
    });

    it('should set errorMessage and submitted to falsy values when after an error the form value changes', () => {
        component.errorMessage = 'Error message';
        component.submitted = true;

        component.form.setValue({username: null, email: 'a', password: null});

        expect(component.errorMessage).toBeFalsy();
        expect(component.submitted).toBeFalse();
    });
});
