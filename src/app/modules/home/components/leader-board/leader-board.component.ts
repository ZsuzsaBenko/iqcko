import { Component, OnInit } from '@angular/core';
import { Member } from '../../../../models/interfaces';
import { MemberService } from '../../../../services/member.service';

@Component({
    selector: 'app-leaderboard',
    templateUrl: './leader-board.component.html',
    styleUrls: ['./leader-board.component.css']
})
export class LeaderBoardComponent implements OnInit {
    membersToShow: Array<Member> = [];
    allMembers: Array<Member> = [];
    areAllMembersShown = false;
    loggedInMember!: Member;

    constructor(private readonly memberService: MemberService) {
    }

    ngOnInit(): void {
        this.getTopLeaderBoard();
        this.getLoggedInMember();
    }

    toggleLeaderBoard(): void {
        if (!this.allMembers.length) {
            this.loadFullLeaderBoard();
        } else {
            this.membersToShow = this.areAllMembersShown ? this.allMembers.slice(0, 10) : this.allMembers;
            this.areAllMembersShown = !this.areAllMembersShown;
        }
    }

    private getTopLeaderBoard(): void {
        this.memberService.getTopLeaderBoard().subscribe(members => {
            this.membersToShow = members;
        });
    }

    private getLoggedInMember(): void {
        this.memberService.getLoggedInMemberProfile().subscribe(member => {
            this.loggedInMember = member;
        });
    }

    private loadFullLeaderBoard(): void {
        this.memberService.getFullLeaderBoard().subscribe(members => {
            this.allMembers = members;
            this.membersToShow = this.allMembers;
            this.areAllMembersShown = true;
        });
    }
}
