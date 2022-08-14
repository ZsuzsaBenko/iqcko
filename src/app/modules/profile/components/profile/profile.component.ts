import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../../../models/interfaces';
import { MemberService } from '../../../../services/member.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    member!: Member;
    isAdminPage!: boolean;
    isFetching = true;

    constructor(private readonly memberService: MemberService,
                private readonly activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        const memberId = this.activatedRoute.snapshot.params.id;
        this.getMember(memberId);
    }

    onMemberUpdated(member: Member): void {
        this.member = member;
    }

    private getMember(memberId: number | undefined): void {
        if (undefined !== memberId) {
            this.isAdminPage = true;
            this.memberService.getMemberById(memberId).subscribe(member => {
                this.member = member;
                this.isFetching = false;
            });
        } else {
            this.isAdminPage = false;
            this.memberService.getLoggedInMemberProfile().subscribe(member => {
                this.member = member;
                this.isFetching = false;
            });
        }
    }
}
