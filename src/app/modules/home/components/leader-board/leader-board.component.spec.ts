import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MemberService } from '../../../../services/member.service';
import { testMember, testMembers } from '../../../../test/test-util.spec';
import { LeaderBoardComponent } from './leader-board.component';
import SpyObj = jasmine.SpyObj;

describe('LeaderBoardComponent', () => {
    let memberServiceSpy: SpyObj<MemberService>;

    let component: LeaderBoardComponent;
    let fixture: ComponentFixture<LeaderBoardComponent>;

    beforeEach(async () => {
        memberServiceSpy = jasmine.createSpyObj('MemberService',
            ['getTopLeaderBoard', 'getFullLeaderBoard', 'getLoggedInMemberProfile']);
        memberServiceSpy.getTopLeaderBoard.and.returnValue(of(testMembers().slice(0, 2)));
        memberServiceSpy.getFullLeaderBoard.and.returnValue(of(testMembers()));
        memberServiceSpy.getLoggedInMemberProfile.and.returnValue(of(testMember()));

        await TestBed.configureTestingModule({
            declarations: [LeaderBoardComponent],
            providers: [
                {provide: MemberService, useValue: memberServiceSpy}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LeaderBoardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get top leaderboard members on init', () => {
        expect(memberServiceSpy.getTopLeaderBoard).toHaveBeenCalled();
        expect(component.membersToShow.length).toEqual(2);
        expect(component.areAllMembersShown).toBeFalse();
    });

    it('should get the logged-in member on init', () => {
        expect(memberServiceSpy.getLoggedInMemberProfile).toHaveBeenCalled();
        expect(component.loggedInMember).toEqual(testMember());
    });

    it('should toggle the leaderboard showing all or just top members', () => {
        component.toggleLeaderBoard();

        expect(component.allMembers.length).toEqual(testMembers().length);
        expect(component.membersToShow.length).toEqual(component.allMembers.length);
        expect(component.areAllMembersShown).toBeTrue();

        component.toggleLeaderBoard();

        expect(component.areAllMembersShown).toBeFalse();
        expect(memberServiceSpy.getFullLeaderBoard).toHaveBeenCalledTimes(1);
    });

});
