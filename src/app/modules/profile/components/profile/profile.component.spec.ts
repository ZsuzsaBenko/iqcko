import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Member } from '../../../../models/interfaces';
import { MemberService } from '../../../../services/member.service';
import { activatedRouteMock, testMember } from '../../../../test/test-util.spec';
import { ProfileComponent } from './profile.component';
import SpyObj = jasmine.SpyObj;

@Component({
    selector: 'app-navbar',
    template: ''
})
class MockNavbarComponent {
}

@Component({
    selector: 'app-member-data',
    template: ''
})
class MockMemberDataComponent {
    @Input() member!: Member;
    @Input() isAdminPage!: boolean;
}

@Component({
    selector: 'app-member-solutions',
    template: ''
})
class MockMemberSolutionsComponent {
    @Input() member!: Member;
    @Input() isAdminPage!: boolean;
}

@Component({
    selector: 'app-member-puzzles',
    template: ''
})
class MockMemberPuzzlesComponent {
    @Input() member!: Member;
    @Input() isAdminPage!: boolean;
}

@Component({
    selector: 'app-member-comments',
    template: ''
})
class MockMemberCommentsComponent {
    @Input() member!: Member;
    @Input() isAdminPage!: boolean;
}

describe('ProfileComponent', () => {
    let memberServiceSpy: SpyObj<MemberService>;
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;

    beforeEach(async () => {
        memberServiceSpy = jasmine.createSpyObj('MemberService',
            ['getMemberById', 'getLoggedInMemberProfile']);
        memberServiceSpy.getMemberById.and.returnValue(of(testMember()));
        memberServiceSpy.getLoggedInMemberProfile.and.returnValue(of(testMember()));

        await TestBed.configureTestingModule({
            declarations: [
                ProfileComponent,
                MockNavbarComponent,
                MockMemberDataComponent,
                MockMemberSolutionsComponent,
                MockMemberPuzzlesComponent,
                MockMemberCommentsComponent
            ],
            providers: [
                {provide: MemberService, useValue: memberServiceSpy},
                {provide: ActivatedRoute, useValue: activatedRouteMock()}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get the member by id for admin purposes', () => {
        expect(memberServiceSpy.getMemberById).toHaveBeenCalledWith(activatedRouteMock().snapshot.params.id);
        expect(component.member).toEqual(testMember());
        expect(component.isAdminPage).toBeTrue();
    });

    it('should get the logged-in member if there is no id param', () => {
        activatedRouteMock().snapshot.params.id = undefined;
        component.ngOnInit();

        expect(memberServiceSpy.getLoggedInMemberProfile).toHaveBeenCalled();
        expect(component.member).toEqual(testMember());
        expect(component.isAdminPage).toBeFalse();
    });

    it('should update the member if update event is received', () => {
        const updatedMember: Member = {...testMember(), username: 'New Username'};

        component.onMemberUpdated(updatedMember);

        expect(component.member).toEqual(updatedMember);
    });
});
