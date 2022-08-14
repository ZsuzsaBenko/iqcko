import { Component, Input } from '@angular/core';
import { Member, PuzzleComment } from '../../../../models/interfaces';
import { CommentService } from '../../../../services/comment.service';

@Component({
    selector: 'app-member-comments',
    templateUrl: './member-comments.component.html',
    styleUrls: ['./member-comments.component.css']
})
export class MemberCommentsComponent {
    @Input() member!: Member;
    @Input() isAdminPage!: boolean;
    comments: Array<PuzzleComment> = [];
    isVisible = false;
    commentsLoaded = false;

    constructor(private readonly commentService: CommentService) {
    }

    toggleVisible(): void {
        this.isVisible = !this.isVisible;
        if (!this.commentsLoaded && this.isVisible) {
            this.getComments();
        }
    }

    onCommentDeleted(deletedComment: PuzzleComment): void {
        const index = this.comments.indexOf(deletedComment);
        this.comments.splice(index, 1);
    }

    private getComments(): void {
        if (this.isAdminPage) {
            this.commentService.getAllCommentsByMember(this.member.id).subscribe(comments => {
                this.comments = comments;
                this.commentsLoaded = true;
            });
        } else {
            this.commentService.getLatestCommentsByLoggedInMember().subscribe(comments => {
                this.comments = comments;
                this.commentsLoaded = true;
            });
        }
    }
}
