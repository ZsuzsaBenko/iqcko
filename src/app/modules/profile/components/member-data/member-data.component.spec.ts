import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Member } from '../../../../models/interfaces';
import { MemberService } from '../../../../services/member.service';
import { testMember } from '../../../../test/test-util.spec';
import { MemberDataComponent } from './member-data.component';
import SpyObj = jasmine.SpyObj;

describe('MemberDataComponent', () => {
    let memberServiceSpy: SpyObj<MemberService>;
    let component: MemberDataComponent;
    let fixture: ComponentFixture<MemberDataComponent>;

    beforeEach(async () => {
        memberServiceSpy = jasmine.createSpyObj('MemberService',
            ['updateMember', 'updateLoggedInMemberProfile']);
        memberServiceSpy.updateMember.and.returnValue(of(testMember()));
        memberServiceSpy.updateLoggedInMemberProfile.and.returnValue(of(testMember()));

        await TestBed.configureTestingModule({
            declarations: [MemberDataComponent],
            imports: [FormsModule],
            providers: [
                {provide: MemberService, useValue: memberServiceSpy}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(MemberDataComponent);
        component = fixture.componentInstance;
        component.member = testMember();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle the form\'s visibility', () => {
        component.toggleFormVisible();
        expect(component.isFormVisible).toBeTrue();

        component.toggleFormVisible();
        expect(component.isFormVisible).toBeFalse();
    });

    it('should subscribe to form value changes when the form is visible and unsubscribe otherwise', () => {
        component.toggleFormVisible();
        expect(component['formSubscription']).toBeDefined();

        component.toggleFormVisible();
        expect(component['formSubscription']).toBeUndefined();
    });

    it('should set the error message, delayed, if the password is too short', fakeAsync(() => {
        component.toggleFormVisible();
        fixture.detectChanges();
        tick(500);

        component.form.form.setValue({username: '', pass: 'aaa', confirmPass: ''});
        component.form.form.updateValueAndValidity();

        tick(2000);

        expect(component.errorMessage).toEqual('A jelszó túl rövid.');

    }));

    it('should set the error message, delayed, if the password and its confirmation do not match', fakeAsync(() => {
        component.toggleFormVisible();
        fixture.detectChanges();
        tick(500);

        component.form.form.setValue({username: '', pass: 'abcd1234', confirmPass: 'Abcd1234'});
        component.form.form.updateValueAndValidity();

        tick(2000);

        expect(component.errorMessage).toEqual('A jelszó és a megerősítése nem egyezik meg.');

    }));

    it('should disable the submit button if form data are invalid or missing', fakeAsync(() => {
        component.toggleFormVisible();
        fixture.detectChanges();
        tick(500);

        component.form.form.setValue({username: '', pass: '', confirmPass: ''});
        component.form.form.updateValueAndValidity();
        tick(1500);

        expect(component.isSubmitDisabled()).toBeTrue();

        component.form.form.setValue({username: '', pass: 'aaa', confirmPass: ''});
        component.form.form.updateValueAndValidity();
        tick(1500);

        expect(component.isSubmitDisabled()).toBeTrue();

        component.form.form.setValue({username: '', pass: 'abcd1234', confirmPass: ''});
        component.form.form.updateValueAndValidity();
        tick(1500);

        expect(component.isSubmitDisabled()).toBeTrue();

        component.form.form.setValue({username: '', pass: '', confirmPass: 'abcd1234'});
        component.form.form.updateValueAndValidity();
        tick(1500);

        expect(component.isSubmitDisabled()).toBeTrue();

        component.form.form.setValue({username: '', pass: 'Abcd1234', confirmPass: 'abcd1234'});
        component.form.form.updateValueAndValidity();
        tick(1500);

        expect(component.isSubmitDisabled()).toBeTrue();

        component.form.form.setValue({username: '', pass: 'Abcd1234', confirmPass: 'Abcd1234'});
        component.form.form.updateValueAndValidity();
        tick(1500);

        expect(component.isSubmitDisabled()).toBeFalse();
    }));

    it('should not update member data if the form is invalid', fakeAsync(() => {
        component.isAdminPage = false;
        component.toggleFormVisible();
        fixture.detectChanges();
        tick(500);

        component.form.form.setValue({username: '', pass: 'aaa', confirmPass: 'aaa'});
        component.form.form.updateValueAndValidity();
        tick(1500);

        component.changeUserData();

        expect(memberServiceSpy.updateLoggedInMemberProfile).not.toHaveBeenCalled();
    }));

    it('should not update member data if the form is empty', fakeAsync(() => {
        component.isAdminPage = false;
        component.toggleFormVisible();
        fixture.detectChanges();
        tick(500);

        component.form.form.setValue({username: '', pass: '', confirmPass: ''});
        component.form.form.updateValueAndValidity();
        tick(1500);

        component.changeUserData();

        expect(memberServiceSpy.updateLoggedInMemberProfile).not.toHaveBeenCalled();
    }));

    it('should not update member data if the password doesn\'t match its confirmation', fakeAsync(() => {
        component.isAdminPage = false;
        component.toggleFormVisible();
        fixture.detectChanges();
        tick(500);

        component.form.form.setValue({username: '', pass: 'abcd1234', confirmPass: 'Abcd1234'});
        component.form.form.updateValueAndValidity();
        tick(1500);

        component.changeUserData();

        expect(memberServiceSpy.updateLoggedInMemberProfile).not.toHaveBeenCalled();
    }));

    it('should update the logged-in member', fakeAsync(() => {
        component.isAdminPage = false;
        component.toggleFormVisible();
        fixture.detectChanges();
        tick(500);

        component.form.form.setValue({username: '', pass: 'MyNewPass', confirmPass: 'MyNewPass'});
        component.form.form.updateValueAndValidity();
        const resetSpy = spyOn(component.form.form, 'reset');
        const toggleSpy = spyOn(component, 'toggleFormVisible');
        const evenEmitterSpy = spyOn(component.memberUpdated, 'emit');
        tick(1500);

        component.changeUserData();

        expect(memberServiceSpy.updateLoggedInMemberProfile)
            .toHaveBeenCalledWith({password: 'MyNewPass'} as unknown as Member);
        expect(evenEmitterSpy).toHaveBeenCalled();
        expect(resetSpy).toHaveBeenCalled();
        expect(toggleSpy).toHaveBeenCalled();
    }));

    it('should update the given member if it\'s admin page', fakeAsync(() => {
        component.isAdminPage = true;
        component.toggleFormVisible();
        fixture.detectChanges();
        tick(500);

        component.form.form.setValue({username: 'Updated username', pass: '', confirmPass: ''});
        component.form.form.updateValueAndValidity();
        const resetSpy = spyOn(component.form.form, 'reset');
        const toggleSpy = spyOn(component, 'toggleFormVisible');
        const evenEmitterSpy = spyOn(component.memberUpdated, 'emit');
        tick(1500);

        component.changeUserData();

        expect(memberServiceSpy.updateMember)
            .toHaveBeenCalledWith(component.member.id, {username: 'Updated username'} as unknown as Member);
        expect(evenEmitterSpy).toHaveBeenCalled();
        expect(resetSpy).toHaveBeenCalled();
        expect(toggleSpy).toHaveBeenCalled();
    }));
});
