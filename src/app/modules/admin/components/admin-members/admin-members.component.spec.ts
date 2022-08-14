import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { MemberService } from '../../../../services/member.service';
import { testMember, testMembers } from '../../../../test/test-util.spec';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { AdminMembersComponent } from './admin-members.component';
import SpyObj = jasmine.SpyObj;

@Component({
    selector: 'app-navbar',
    template: ''
})
class MockNavbarComponent {
}

describe('AdminMembersComponent', () => {
    let memberServiceSpy: SpyObj<MemberService>;
    let modalServiceSpy: SpyObj<NgbModal>;
    let component: AdminMembersComponent;
    let fixture: ComponentFixture<AdminMembersComponent>;

    beforeEach(async () => {
        memberServiceSpy = jasmine.createSpyObj('MemberService', ['getAllMembers', 'deleteMember']);
        memberServiceSpy.getAllMembers.and.returnValue(of(testMembers()));
        memberServiceSpy.deleteMember.and.returnValue(of(null));
        modalServiceSpy = jasmine.createSpyObj('NgbModal', ['open']);

        await TestBed.configureTestingModule({
            declarations: [
                AdminMembersComponent,
                MockNavbarComponent
            ],
            imports: [
                FontAwesomeModule,
                RouterTestingModule
            ],
            providers: [
                {provide: MemberService, useValue: memberServiceSpy},
                {provide: NgbModal, useValue: modalServiceSpy}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AdminMembersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get all members on init and initialize properties', () => {
        expect(component.faEdit).toBeTruthy();
        expect(component.faTrash).toBeTruthy();
        expect(component.members.length).toEqual(testMembers().length);
        expect(memberServiceSpy.getAllMembers).toHaveBeenCalled();
    });

    it('should not delete a member without confirmation', () => {
        const mockModalRef = {
            componentInstance: ConfirmModalComponent,
            close: (): void => {
                // intentionally left empty
            },
            closed: of(false)
        } as unknown as NgbModalRef;
        modalServiceSpy.open.and.returnValue(mockModalRef);

        component.deleteMember(testMember().id);

        expect(modalServiceSpy.open).toHaveBeenCalled();
        expect(memberServiceSpy.deleteMember).not.toHaveBeenCalled();
    });

    it('should delete a member if confirmed', () => {
        const mockModalRef = {
            componentInstance: ConfirmModalComponent,
            close: (): void => {
                // intentionally left empty
            },
            closed: of(true)
        } as unknown as NgbModalRef;
        modalServiceSpy.open.and.returnValue(mockModalRef);

        component.deleteMember(testMember().id);

        expect(modalServiceSpy.open).toHaveBeenCalled();
        expect(memberServiceSpy.deleteMember).toHaveBeenCalled();
    });
});

