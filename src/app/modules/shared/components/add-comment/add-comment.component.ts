import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PuzzleComment } from '../../../../models/interfaces';
import { CommentService } from '../../../../services/comment.service';

@Component({
    selector: 'app-add-comment',
    templateUrl: './add-comment.component.html',
    styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent {
    @Input() comments!: Array<PuzzleComment>;
    @Input() puzzleId!: number;

    constructor(private readonly commentService: CommentService) {
    }

    onSubmit(form: NgForm): void {
        if (!form.value.agreement || !form.value.message) {
            return;
        }

        const newPuzzleComment: PuzzleComment = {
            message: form.value.message,
            puzzle: {
                id: +this.puzzleId
            }
        } as unknown as PuzzleComment;

        this.commentService.saveComment(newPuzzleComment).subscribe(response => {
            form.reset();
            this.comments.push(response);
        });
    }

}
