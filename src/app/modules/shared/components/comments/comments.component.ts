import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member, PuzzleComment } from '../../../../models/interfaces';
import { CommentService } from '../../../../services/comment.service';
import { MemberService } from '../../../../services/member.service';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
    comments: Array<PuzzleComment> = [];
    puzzleId!: number;
    loggedInMember!: Member;
    isFetching = true;

    constructor(private readonly commentService: CommentService,
                private readonly memberService: MemberService,
                private readonly activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.puzzleId = this.activatedRoute.snapshot.params.id;
        this.commentService.getAllCommentsByPuzzle(this.puzzleId).subscribe(comments => {
            this.comments = comments;
            this.isFetching = false;
        });

        this.memberService.getLoggedInMemberProfile().subscribe(member => this.loggedInMember = member);
    }

}
