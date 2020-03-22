import { Component, OnInit } from '@angular/core';

import { Member } from '../../../../models/Member';
import { MemberService } from '../../../../services/member.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.css']
})
export class LeaderBoardComponent implements OnInit {
  membersToShow: Member[];
  allMembers: Member[];
  areAllMembersShown = false;
  loggedInMember = new Member();

  constructor(private memberService: MemberService) {
  }

  ngOnInit() {
    this.memberService.getTopLeaderBoard().subscribe(members => {
      this.membersToShow = members;
    });

    this.memberService.getLoggedInMemberProfile().subscribe(member => {
      this.loggedInMember = member;
    });
  }

  toggleLeaderBoard() {
    if (!this.allMembers) {
      this.loadFullLeaderBoard();
    } else {
      this.membersToShow = this.areAllMembersShown ? this.allMembers.slice(0, 10) : this.allMembers;
      this.areAllMembersShown = !this.areAllMembersShown;
    }

  }

  private loadFullLeaderBoard() {
    this.memberService.getFullLeaderBoard().subscribe(members => {
      this.allMembers = members;
      this.membersToShow = this.allMembers;
      this.areAllMembersShown = true;
    });
  }
}
