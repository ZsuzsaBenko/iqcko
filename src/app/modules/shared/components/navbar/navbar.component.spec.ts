import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './navbar.component';
import SpyObj = jasmine.SpyObj;

describe('NavbarComponent', () => {
    let routerSpy: SpyObj<Router>;
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;

    beforeEach(async () => {
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            declarations: [NavbarComponent],
            imports: [FontAwesomeModule],
            providers: [
                {provide: Router, useValue: routerSpy}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should log the user our', () => {
        const storageSpy = spyOn(localStorage, 'removeItem');

        component.logout();

        expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
        expect(storageSpy).toHaveBeenCalled();
    });
});
