import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { ErrorComponent } from './error.component';
import SpyObj = jasmine.SpyObj;

@Component({
    selector: 'app-navbar',
    template: ''
})
class MockNavbarComponent {
}

describe('ErrorComponent', () => {
    const errorMessage = 'Error message.';
    let errorHandlerServiceSpy: SpyObj<ErrorHandlerService>;
    let routerSpy: SpyObj<Router>;

    let component: ErrorComponent;
    let fixture: ComponentFixture<ErrorComponent>;

    beforeEach(async () => {
        errorHandlerServiceSpy = jasmine.createSpyObj('ErrorHandlerService', ['']);
        errorHandlerServiceSpy.errorMessage = errorMessage;
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            declarations: [
                ErrorComponent,
                MockNavbarComponent
            ],
            imports: [FontAwesomeModule],
            providers: [
                {provide: ErrorHandlerService, useValue: errorHandlerServiceSpy},
                {provide: Router, useValue: routerSpy}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ErrorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get error message from the service', () => {
        expect(component.errorMessage).toEqual(errorMessage);
    });

    it('should redirect to the login page if needed', fakeAsync(() => {
        errorHandlerServiceSpy.shouldRedirectToLogin = true;
        component.ngOnInit();

        tick(5000);

        expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    }));
});
